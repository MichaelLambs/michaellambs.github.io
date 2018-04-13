var mongoose = require('mongoose');
var connectionString = 'mongodb://test:test@ds014118.mlab.com:14118/lambchopps-landing';
var connection = mongoose.connection;

mongoose.connect(connectionString);
connection.on('error', err => {
    console.log('server error:', err);
});
connection.once('open', () => {
    console.log('Connected to Database');
});