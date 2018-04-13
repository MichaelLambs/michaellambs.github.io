var express = require('express');
var bp = require('body-parser');
var cors = require('cors');

var server = express();
var port = process.env.PORT || 3000;

require('./db/mlab-config');

var emailRoutes = require('./routes/email')

var whitelist = ['http://localhost:8080', 'https://lambchopps.herokuapp.com/'] // CHANGE FOR HEROKU

var corsOptions = {
    origin: function(origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1
        callback(null, originIsWhitelisted)
    },
    credentials: true
};

server.use(cors(corsOptions));
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));


server.use(emailRoutes.router)

server.use('*', (error, req, res, next) => {
    res.status(400).send(error);
});

server.listen(port, () => {
    console.log('Server Is Running On Port: ', port);
});