const router = require('express').Router()
const journalsController = require('../controllers/journals.controller')();


module.exports = router

// api routes ===========================================================
router.get('/', journalsController.getAll)
router.get('/:id', journalsController.getOneById)
router.post('/', journalsController.insert)
router.put('/:id', journalsController.updateById)
router.delete('/:id', journalsController.removeById)
router.put('/archive/:id', journalsController.archiveById)

