const mongoose = require('mongoose');

const environment = process.env.NODE_ENV;
const stage = require('../../config')[environment];

const Schema = mongoose.Schema;

const taskHistorySchema = new Schema({
    taskId: {
        type: 'String',
        required: true
    },
    taskname: {
        type: 'String',
        required: true,
        trim: true
    },
    taskStatus: {
        type: 'NUmber',
        required: true
    }
});

module.exports = mongoose.model('TaskHistroy', taskHistorySchema);