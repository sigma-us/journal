const router = require('express').Router();
const path =require('path');
module.exports = router;

router.post('/', (req, res, next) => {
    res.status(200).json(req.body);
})
router.get('/', (req, res, next) => {
    res.sendFile('public/index.html', {
        root: path.join(__dirname, '../..')
    });
})