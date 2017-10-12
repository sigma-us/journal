const express = require("express");
const app = express();
const path = require("path");

module.exports = app;

// static files ==============================================
app.use(
    "/public",
    express.static(path.join(__dirname, "../../public"), {
        fallthrough: false
    })
);

app.use(
    "/public/build",
    express.static(path.join(__dirname, "../../public/build"), {
        fallthrough: false
    })
);

// static files ==============================================
