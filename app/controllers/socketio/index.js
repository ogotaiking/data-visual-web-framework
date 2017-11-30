
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

/*
 * Socket IO interworking with MQTT
 */
var mqtt = require('mqtt');
io.sockets.on('connection', function(socket) {
    var client = mqtt.connect('mqtt://127.0.0.1');

    socket.on('publish', function(topic, message) {
        client.publish(topic, message);
    });

    socket.on('subscribe', function (topic) {
        client.subscribe(topic);
    });

    client.on('message', function(topic, message) {
        socket.emit('message', topic, JSON.parse(message.toString()));
    });
});


/**
  *  Add aditional Socket IO service int the following segment
  */
    require('./demo/chat')(io);
    require('./demo/stock_md')(io);
}
