const express = require('express');
const router = express.Router();
const path = require('path')
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../models/user');

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
                    return;
                }

                req.flash('success', 'You are now registered and can log in.');
                res.redirect('/users/login');
            });
        })
    })
});

// Login Form
router.get('/login', (req, res) => {
   res.sendFile('static/login.html', { root: path.join(__dirname, '/..') });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash();
    res.redirect('/users/login');
});

module.exports = router;