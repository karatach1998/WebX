const express = require('express');
const router = express.Router();

let Board = require('../../models/board');

router.get('/', async (req, res) => {
    console.log('INCOMING REQUEST!!!!');
    console.log('++++++++++++++++++++++');
    console.log(req.body);
    const requestedFields = ['_id', 'title', 'bgUrl', 'stared'].join(' ');

    // Get stared boards
    const stared = await Board.find({ 'stared': true }, requestedFields);
    console.log(stared);

    // Get recent boards
    // TODO(sergey): rename field 'lastRequestTime' to 'updatedAt'.
    const recent = await Board.find({}, requestedFields, { sort: '-lastRequestTime' });
    console.log(recent);

    res.json([
        { 'groupTitle': 'Stared', 'groupBoards': stared },
        { 'groupTitle': 'Recent', 'groupBoards': recent },
    ])
});

router.get('/:boardId/', async (req, res) => {
    const { boardId } = req.params;
    const requestedFields = ['_id', 'title', 'columns', 'bgUrl', 'stared'].join(' ');

    const board = await Board.findOneAndUpdate({ _id: boardId }, requestedFields, {});
    console.log(board);
    res.json(board);
});

// ObjectId("5bf89813354e0508dcf6b9fd")
// ObjectId("5bf8989f354e0508dcf6b9fe")

module.exports = (app) => {
    app.use('/api/boards', router);
};