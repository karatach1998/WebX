const express = require('express');
const router = express.Router();
const url = require('url');
const _ = require('underscore');

const Board = require('../../models/board');
const Task = require('../../models/task');
const User = require('../../models/user');

module.exports = (app) => {
    const imageRepo = require('../helpers/imageRepo')(app);

    router.get('/', async (req, res) => {
        console.log('INCOMING REQUEST!!!!');
        console.log('++++++++++++++++++++++');
        console.log(req.body);
        console.log(req.session);
        const {userId} = req.session;
        const requestedFields = _(['_id', 'title', 'bgUrl', 'stared']).join(' ');

        // Get stared boards
        const stared = await Board.find({ ownerId: userId, stared: true }, requestedFields);
        console.log(stared);

        // Get recent boards
        // TODO(sergey): rename field 'lastRequestTime' to 'updatedAt'.
        const recent = await Board.find({ ownerId: userId }, requestedFields, { sort: '-lastRequestTime' });
        console.log(recent);

        // Get all boards
        const other = await Board
            .find({ _id: { '$nin': _(stared).map(({_id}) => _id) }, ownerId: userId }, requestedFields);

        res.json({
            groups: [
                { groupTitle: 'Stared', groupBoards: stared },
                { groupTitle: 'Recent', groupBoards: recent },
                { groupTitle: 'Other', groupBoards: other }
            ]
        });
    });

    router.get('/admin', async (req, res) => {
        console.log('ADMIN');
        const {userId} = req.session;
        const requestedFields = _(['_id', 'title', 'bgUrl', 'stared']).join(' ');

        const {role: userRole} = await User.findById(userId, 'role').exec();
        console.log(userRole);
        if (userRole !== 'admin') {
            res.status(401).end();
            return;
        }

        let {username, boardTitle} = url.parse(req.url, true).query;
        let query = {};

        console.log(username, boardTitle);
        if (username && !username.match(/^\s*$/)) {
            await User.findOne({username}, (err, user) => {
                if (!err) {
                    _.extend(query, {ownerId: user && user._id});
                }
            });
        }
        if (boardTitle && !boardTitle.match(/^\s*$/)) _.extend(query, {title: {$regex: boardTitle}});

        console.log('QUERY');
        console.log(query);

        const boards = await Board.find(query, requestedFields).exec();

        console.log('BOARDS');
        console.log(boards);
        res.status(200).json([{groupTitle: 'Result', groupBoards: boards}]);
    });

    router.post('/', async (req, res) => {
        const {title} = req.body;
        const {userId} = req.session;
        console.log('77777777777777777777777777777');
        console.log(title);

        // NOTE(sergeY): We can't use Board.create({...}).exec(), because Board.create returns Promise.
        // So we can only use Board.create({...}).then() .
        Board.create({title, ownerId: userId, bgUrl: await imageRepo.getRandomPhotoUrl()}).then(({_id: boardId}) => {
            res.status(200).json({boardId});
        }).catch((err) => {
            res.status(400).end();
        });
    });

    router.get('/:boardId/', (req, res) => {
        const { boardId } = req.params;
        const requestedFields = ['_id', 'title', 'columns', 'bgUrl', 'bgColor', 'stared'].join(' ');

        Board.findOneAndUpdate({ _id: boardId }, requestedFields, {}, (err, board) => {
            if (err) {
                console.error(err);
                res.status(404).end();
            }
            console.log(board);
            res.status(200).json(board);
        });
    });

    router.post('/:boardId', async (req, res) => {
        const { boardId } = req.params;
        const {taskTitle, columnIndex} = req.body;

        const {_id: taskId, title} = await Task({title: taskTitle, boardId, columnIndex}).save().catch(x => console.log(x));
        res.status(200).json({taskId, title});
    });

    router.put('/:boardId', (req, res) => {
        const { boardId } = req.params;
        const board = req.body;

        console.log('43218792000000000000000000000000000000000000000000000000000000');
        console.log(board);
        Board.updateOne({ _id: boardId }, board, (err) => {
            console.log('called');
            if (err) {
                res.status(402).end();
                return;
            }
            return res.status(200).end();
        });
    });

    router.delete('/:boardId', (req, res) => {
        const { boardId } = req.params;

        Board.deleteOne({ _id: boardId }, (err) => {
            if (err) {
                res.status(402).end();
                return;
            }

            res.status(200).end();
        });
    });

// ObjectId("5bf89813354e0508dcf6b9fd")
// ObjectId("5bf8989f354e0508dcf6b9fe")

    app.use('/api/boards', router);
};
