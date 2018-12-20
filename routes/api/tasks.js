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

router.put('/:taskId', async (req, res) => {
    const { taskId } = req.body;
});

router.delete('/:taskId', async (req, res) => {

});

module.exports = (app) => {
    app.use('/api/tasks', router);
};