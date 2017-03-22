
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var sessionConfig = require('../../../config/session.js');
var configDB = require('../../../config/database.js');
var MongoStore = require('connect-mongo')(session);
var sessionDb = new MongoStore({  url: configDB.url });
var passport = require('passport');

module.exports = function(io) {
/**
  * Socket IO authentication by cookie
  */
    io.use(function(socket, next) {
        cookieParser(sessionConfig.secret)(socket.request, {}, function(err) {
            var sessionId = socket.request.signedCookies['passport_cookie'];
            sessionDb.get(sessionId, function(err, session) {
                socket.request.session = session;
                passport.initialize()(socket.request, {}, function() {
                    passport.session()(socket.request, {}, function() {
                        if (socket.request.user) {
                            //console.log('auth successful');
                            next(null, true);
                        } else {
                            //console.log('auth failed');
                            next(new Error('User is not authenticatied'), false);
                        }
                    })
                });
            })
        });
    });

/**
  *  Add aditional Socket IO service int the following segment
  */
    require('./demo/basic')(io);
    require('./demo/chat')(io);
    require('./demo/stock_md')(io);


}
