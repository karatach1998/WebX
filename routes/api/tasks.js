const express = require('express');
const router = express.Router();
const _ = require('underscore');

const Task = require('../../models/task');

router.get('/:taskId', async (req, res) => {
    const { taskId } = req.params;

    console.log('tasks');
    console.log(taskId);
    Task.findById(taskId, (err, task) => {
        console.log(err);
        console.log(task);
        if (err) {
            res.status(404).end();
            return;
        }

        res.status(200).json(task);
    });
});

router.post('/', (req, res) => {
    let {title, text,  boardId, columnIndex} = req.body;

    if (text === undefined) text = '';
    Task({title, text,  boardId, columnIndex}).save();
});

router.put('/:taskId', (req, res) => {
    const {taskId} = req.params;
    const task = req.body;

    console.log(task);
    Task.updateOne({_id: taskId}, task, (err) => {
        console.log('called');
        console.log(err);
        if (err) {
            res.status(404).end();
            return;
        }
        return res.status(200).end();
    })
});

router.delete('/:taskId', async (req, res) => {
    const {taskId} = req.params;

    console.log('DELETE<1>!!!!!!!!!!!!!!1');
    await Task.findById(taskId, (err, task) => {
        console.log('DELETE<2>!!!!!!!!!!!!!!1');
        if (err) {
            res.status(404).end();
            return;
        }

        task.remove();
        res.status(200).end();
    });
});

module.exports = (app) => {
    app.use('/api/tasks', router);
};