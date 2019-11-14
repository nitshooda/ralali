//import dotenv from "dotenv";
const express = require("express");
const app = express();

const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

const router = require("./src/routes/route");
app.use("/", jsonParser, router);

// initialize configuration

const port = process.env.PORT || 8080;

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );