const express = require("express");
const userservice = require("./../services/userService");
const taskservice = require("./../services/taskService");

const router = express.Router();

//Post Method
router.post("/register", userservice.register);
router.post("/login", userservice.login);
router.post("/addTask", taskservice.addTask);
router.post("/taskAction", taskservice.taskAction);

//Get Method
router.get("/getAllTasks", taskservice.getAllTasks);
router.get("/getTaskHistory", taskservice.getTaskHistory);
module.exports = router;