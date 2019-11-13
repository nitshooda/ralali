const express = require("express");
const shortenService = require("./../services/shortenService");
const userservice = require("./../services/userService");
const taskservice = require("./../services/taskService");

const router = express.Router();

//Post Method
router.post("/shorten", shortenService);
router.post("/register", userservice.register);
router.post("/login", userservice.login);
router.post("/addTask", taskservice.addTask);

//Get Method
router.get("/getAllTasks", taskservice.getAllTasks);

module.exports = router;