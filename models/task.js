const mongoose = require('mongoose');
const {Schema, Types: {ObjectId}} = mongoose;

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

TaskSchema.post(/^update/, async function(task, next) {
    const taskId = this.getQuery()._id || task._id || task.id;
    const {title} = this.getUpdate();
    console.log(title);

    console.log(taskId);
    if (title) {
        const {title, boardId, columnIndex} = await Task.findById(taskId, 'title boardId columnIndex');

        await Board.findById(boardId).updateOne(
            {[`columns.${columnIndex}.tasks.taskId`]: taskId},
            {$set: {[`columns.${columnIndex}.tasks.$.title`]: title}}, (err, data) => {
                console.log('update done');
                console.log(data);
        });
    }
    next();
});

TaskSchema.pre('remove', async function(next) {
    console.log('PRE REMOVE');
    const {_id: taskId, boardId, columnIndex} = this;

    await Board.findByIdAndUpdate(boardId, {$pull: {[`columns.${columnIndex}.tasks`]: {taskId}}}).exec();
    console.log(taskId, boardId, columnIndex);
    const res  = await Board.findOne({_id: boardId, [`columns.${columnIndex}.tasks`]: taskId}).count();

    console.log(res);
    if (res === 0) next();
});

const Task = module.exports = mongoose.model('Tasks', TaskSchema);