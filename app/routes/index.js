//const passport = require('passport');
const router = require("express").Router();
const sitesRoutes = require("./sites.routes");
const journalsRoutes = require("./journals.routes");


router.use('/api/journals', journalsRoutes);

// Handle API 404
router.use("/api/*", function(req, res, next) {
    res.sendStatus(404);
});

router.use(sitesRoutes);

router.use(function(err, req, res, next) {
    // If the error object doesn't exists
    if (!err) {
        return next();
    }

    // Log it
    console.error(err.stack);

    // Redirect to error page
    res.sendStatus(500);
});

module.exports = router;
