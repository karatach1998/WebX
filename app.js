const express = require('express');
const path = require('path');
const morgan = require('morgan'); // For incoming HTTP requests logging.
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');

const User = require('./models/user');

mongoose.connect('mongodb://webx_mongo:27017/webx', {
    useNewUrlParser: true,
    reconnectTries: 10,
    reconnectInterval: 3000
});
let db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {
    console.log('Connected to MongoDB');
});

const app = express();
const PORT = 3000;

// app.set('views', path.join(__dirname, '/'));

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/static')));

app.use(session({
    secret: 'webx',
    resave: true,
    saveUninitialized: false
}));

app.use(require('connect-flash')());
// app.use((req, res, next) => {
//     res.locals.messages = require('express-messages')(req, res);
//     next();
// });

app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        let namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return { param: formParam, msg, value };
    }
}));

// app.get('/', (req, res) => {
//     const auth = new AuthService();
// });
//
// app.get('/login', (req, res) => {
//
// });

// Passport config.
require('./config/passport')(passport);

// Passport middleware.
app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
    // return next(); // TODO: Debug only purposes fix.
    console.log(req.url);
    if (/^.*\/login/.test(req.url)) {
        console.log('startsWich');
        next();
    }
    User.findOne({ sessionId: req.session.sessionId }, (err, user) => {
        return next();
    });

    console.log('redirect :login');
    // redirect otherwise
    res.redirect('/login');
}

// app.get('*', ensureAuthenticated, (req, res, next) => {
//     // res.locals.user = req.user || null;
//     next();
// });

// app.use(ensureAuthenticated);

require('./routes')(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/index.html'));
});

app.listen(PORT, () => console.log(`Server app listening on port ${PORT}!`));