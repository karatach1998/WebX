const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const passport = require('passport');

let User = require('../../models/user');

// Register Form
router.get('/register', (req, res) => {
   res.sendfile('static/register.html');
});

router.post('/register', (req, res) => {
    const {username, email, password1, password2} = req.body;
    console.log(username);
    console.log(email);
    console.log(password1);
    console.log(password2);

    req.checkBody('username', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password1', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password1);

    let errors = req.validationErrors();

    console.log('Try to register.');
    console.log(errors);
    if (errors) {
        return;
    }

    let newUser = new User({ username, email, password: password1 });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(err => {
                console.log('Hashing.');
                if (err) {
                    console.log(err);
                    res.status(400).end();
                    return;
                }

                req.flash('success', 'You are now registered and can log in.');
                res.status(200).end();
            });
        })
    })
});

router.get('/login', (req, res) => {
    console.log('/login');
    console.log(req.session);
    const sessionId = req.session.sessionId;
    console.log(sessionId);

    if (!sessionId) {
        res.status(407).end();
    }
    User.findOne({ sessionId }, (err, user) => {
        console.log(err);
        console.log(user);
        if (err || !user) { console.log(406); res.status(406).end(); }
        else { console.log(200); res.status(200).end(); }
    });
});

// 200 - success
// 404
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log('PASSPORT LOGIN!');
        console.log(user);
        if (err) {
            return res.status(400).json({
                message: err.message
            });
        }
        if (!user) {
            return res.status(400).json({
                message: 'Incorrect credentials.'
            });
        }

        const sessionId = uuid();
        User.findByIdAndUpdate(user._id, { sessionId }, (err, user) => {
            req.session.sessionId = sessionId;
            req.session.userId = user._id;

            res.status(200).json({
                message: 'You have successfully logged in!',
                sid: sessionId,
                role: user.role
            });
        });
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    req.flash();
    res.redirect('/');
});

module.exports = (app) => {
    app.use('/api/users/', router);
};