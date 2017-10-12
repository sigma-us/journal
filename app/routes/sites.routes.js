const router = require('express').Router();
const sitesController = require('../controllers/sites.controller')


// router.post('/', (req, res, next) => {
//     res.status(200).json(req.body);
// })
router.get('*', sitesController.default)

module.exports = router;