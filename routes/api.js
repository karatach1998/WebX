const express = require('express');
const router = express.Router();

let Board = require('../models/board');

router.get('/boards', (req, res) => {
    console.log('INCOMMING REQUEST!!!!');
    // Get all boards
    Board.find({}, 'title', (err, us) => {
        res.json(us);
    });
});

router.get('/:boardId/', (req, res) => {
    const { boardId } = req.params;
    console.log(boardId);
    Board.findOne({ _id: boardId }, (err, board) => {
        console.log(board);
        if (err) res.sendStatus(404);
        if (!board) res.sendStatus(404);

        res.render('board', board);
    });
});

// ObjectId("5bf89813354e0508dcf6b9fd")
// ObjectId("5bf8989f354e0508dcf6b9fe")

module.exports = router;