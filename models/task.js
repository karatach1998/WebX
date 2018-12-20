const mongoose = require('mongoose');
const { Schema } = mongoose;

const Board = require('./board');

const TaskSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: false, default: '' },
    boardId: { type: String, required: true },
    columnIndex: { type: Number, required: true }
});

TaskSchema.pre('save', async function(next) {
    const {_id: taskId, title, boardId, columnIndex} = this;

    Board.findByIdAndUpdate(boardId, {$push: {[`columns.${columnIndex}.tasks`]: {taskId, title}}}).exec();
    next();
});

TaskSchema.pre('remove', async function(next) {
    const {_id: taskId, boardId, columnIndex} = this;

    Board.findByIdAndUpdate(boardId, {$pull: {[`columns.${columnIndex}.tasks`]: {$match: {taskId}}}});
    const res = Board.findOne({_id: boardId, [`columns.${columnIndex}.tasks`]: taskId}).count();

    console.log(res);
    if (res === 0) next();
});

module.exports = mongoose.model('Tasks', TaskSchema);