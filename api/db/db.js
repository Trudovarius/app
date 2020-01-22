var mongoose    = require('mongoose');
var log         = require('./log')(module);

var config      = require('./config');
mongoose.Promise = global.Promise;
mongoose.connect(config.url, { useUnifiedTopology: true });
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;
