var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

var app = express();

var setLocale = require('./app/controllers/locales/index');
var isLoggedIn = require('./app/controllers/login/authCheck');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

/**
  * React View Engine setup
  */
app.set('view engine', 'jsx');
var cfgERV = {
  beautify: true,
  babel : {
    presets: ['react', 'es2015']
  },
  transformViews: true  //it's about babel-register for view
}
app.engine('jsx', require('express-react-views').createEngine(cfgERV));




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
} else if (process.env.NODE_ENV === 'production'){
  app.use(compress());
}



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



var session  = require('express-session');
var configDB = require('./config/database.js');
var sessionConfig = require('./config/session.js');
var MongoStore = require('connect-mongo')(session);
sessionConfig.store = new MongoStore({  url: configDB.url });


var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

/**
 * DB and User Authentication ======================================
 **/
// connect to our database
mongoose.connect(configDB.url);

// pass passport for configuration
require('./app/controllers/login/passport')(passport);


// required for passport
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(setLocale);




/**
 * Static File folder protection ======================================
 **/
var urlAuthcheck = require('./app/controllers/login/urlAuthCheck');
app.use(urlAuthcheck('/views'));

//static folder should be used after url login check
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Route Section======================================================
 **/

app.use('/', routes);





var adminMgr = require('./routes/admin');
app.use('/admin',isLoggedIn, adminMgr);

var testComp = require('./routes/test');
app.use('/test', testComp);



var restAPI = require('./routes/restapi');
app.use('/api',restAPI);

/**
 * Error Handler======================================================
 **/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
