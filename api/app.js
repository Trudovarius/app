var express = require('express');
var path = require('path');
var flash = require('connect-flash');
var passport = require('passport');
var ArticleModel    = require('./db/db').ArticleModel;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var cors = require('cors');

var app = express();

const config = require('./db/config');
require('./passport/passport')(passport); // pass passport for configuration

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({
  secret: 'kokoooos',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors());


require('./routes/user.js')(app, passport);
require('./routes/category.js')(app, passport);


app.set('view engine', 'ejs');
app.use(bodyParser.json({ type: 'application/*+json' }))


app.listen(config.port, () => {
  console.log('app working on 3000')
});

module.exports = app;
