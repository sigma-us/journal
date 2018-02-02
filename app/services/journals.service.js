module.exports = journalsService

function journalsService(options) {
    let journal
    if (!options.journalModelService) {
        throw new Error('Options.modelService is required')
    }

    Journal = options.journalModelService

    return {
        getAll: getAll,
        getOne: getOne,
        insert: insert,
        updateOne: updateOne,
        removeOne: removeOne
    }

    function getAll(req, res) {
        let journals = Journal.find()
        // if (req.query.active){
        //     benefits.where('isArchived').eq(false)
        // }
        return journals;
    }
    

    function getOne(queryCondition) {
        return Journal.findOne(queryCondition)
    }

    function insert(document) {
        let journal = new Journal(document)
        return journal.save()
    }

    function updateOne(queryCondition, journal) {
        return Journal.findOneAndUpdate(queryCondition, journal, {
            new: true
        })
    }

    function removeOne(queryCondition) {
        return Journal.findOneAndRemove(queryCondition)
    }

}