const mongoose = require('mongoose');

const environment = process.env.NODE_ENV;
const stage = require('../../config')[environment];

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskname: {
        type: 'String',
        required: true,
        trim: true
    },
    project: {
        type: 'String',
        required: true,
        trim: true
    },
    taskStatus: {
        type: 'Number',
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);