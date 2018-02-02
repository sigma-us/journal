const responses = require('../models/responses')
const path = require('path')
const apiPrefix = '/api/journal'
const journalModel = require('../models/journal')
const journalsService = require('../services/journals.service')({
    journalModelService: journalModel
})

module.exports = journalsController

function journalsController() {
    return {
        getAll: getAll,
        getOneById: getOneById,
        insert: insert,
        updateById: updateById,
        removeById: removeById,
        archiveById: archiveById
    }
}

function getAll(req, res) {
    journalsService.getAll(req, res)
        .then((journals) => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = journals
            res.json(responseModel)
        }).catch((err) => {
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function getOneById(req, res) {
    let queryCondition = {
        _id: req.params.id
    }
    journalsService.getOne(queryCondition)
        .then((journals) => {
            const responseModel = new responses.ItemsResponse()
            responseModel.item = journals
            res.json(responseModel)
        }).catch(err => {
           return res.status(500).send(new responses.ErrorResponse(err))
        })
}


function insert(req, res) {
    let journal = new journalModel(req.body);
    journal.validate(error => {
        if (error) {
            //when client side error use 400
            return res.status(400).send(new responses.ErrorResponse(error))
        }
        journalsService
            .insert(req.body)
            .then(journal => {
                const responseModel = new responses.ItemResponse();
                responseModel.item = journal;
                res
                    .status(201)
                    .location(path.join(apiPrefix, journal._id.toString()))
                    .json(responseModel);
            })
            .catch(error => {
                //when error is from server use 500
                return res.status(500).send(new responses.ErrorResponse(error))
            })
    })
}

function updateById(req, res) {
    let journal = new journalModel(req.body);
    journal.validate(error => {
        if (error) {
            //when client side error use 400
            return res.status(400).send(new responses.ErrorResponse(error))
        }
        let queryCondition = {
            _id: req.params.id
        }
        journalsService.updateOne(queryCondition, req.body)
        
            .then(journal => {
                const responseModel = new responses.ItemResponse();
                res.status(201).json(responseModel);
            })
            .catch(error => {
                return res.status(500).send(new responses.ErrorResponse(error))
            })
    })
}

function archiveById(req, res) {
    let archiveValue = req.body.isArchived
    let queryCondition = {
        _id: req.body.id
    }
    let document = {
        $set: { "isArchived": archiveValue }
    };
    let journal = new journalModel(document);
    var opts = { runValidators: true };
    journalsService.updateOne(queryCondition, document, opts)
        .then(journal => {
            const responseModel = new responses.ItemResponse(journal);
            if (journal._doc.isArchived===true) {
                res.status(201).json(responseModel);
                // res.status(201).json({message:'Archive Succesful'});
            }
            else {
                res.status(201).json(responseModel);
                // res.status(201).json({message:'Archive Restored'});
            }
        })
        .catch(error => {
            return res.status(500).send(new response.ErrorResponse(error))
        })
}

function removeById(req, res) {
    let queryCondition = {
        _id: req.params.id
    }
    journalsService.removeOne(queryCondition)
        .then((journal) => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = journal
            res.json(responseModel)
        })
        .catch((err) => {
            return res.status(500).send(new responses.ErrorResponse(err))
        })
}
