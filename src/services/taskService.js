const mongoose = require('mongoose');

const connUri = process.env.MONGO_DEV_CONN_URL;
const Task = require('../models/task');

module.exports = {
    addTask: (req, res) => {
        mongoose.connect(connUri, { useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            let result = {};
            let status = 201;
            if (!err) {
              const { taskname, project } = req.body;
              const taskStatus = 'unattended';
              const task = new Task({ taskname, project, taskStatus });
              task.save((err, user) => {
                if (!err) {
                  result.status = status;
                  result.result = task;
                } else {
                  status = 500;
                  result.status = status;
                  result.error = err;
                }
                res.status(status).send();
              });
            } else {
              status = 500;
              result.status = status;
              result.error = err;
              res.status(status).send(result);
            }
          });
    },

    getAllTasks: (req, res) => {
        mongoose.connect(connUri, { useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            let result = {};
            let status = 201;
            if (!err) {
              
              Task.find({}, (err, tasks) => {
                if (!err) {
                  result.status = status;
                  result.result = tasks;
                } else {
                  status = 500;
                  result.status = status;
                  result.error = err;
                }
                res.status(status).send(result);
              });
            } else {
              status = 500;
              result.status = status;
              result.error = err;
              res.status(status).send(result);
            }
          });
    },

    taskAction: (req, res) => {
      mongoose.connect(connUri, { useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
        let result = {};
        let status = 201;
        if (!err) {
          const { taskId, taskname, taskStatus } = req.body;
          const taskHistory = new TaskHistory({taskId, taskname, taskStatus})
          taskHistory.save((err, _task) => {
            if (!err) {
              result.status = status;
              result.result = _task;
              Task.findOne({ _Id: ObjectId(taskId) }, function (err, doc){
                if(!err){
                  doc.taskStatus = req.taskStatus;
                  doc.save();
                }
              });
            } else {
              status = 500;
              result.status = status;
              result.error = err;
            }
            res.status(status).send(result);
          });
        } else {
          status = 500;
          result.status = status;
          result.error = err;
          res.status(status).send(result);
        }
      });
    }
};