const express = require("express");
const shortenService = require("./../services/shortenService");

const router = express.Router();

//Post Method
router.post("/shorten", shortenService);

module.exports = router;