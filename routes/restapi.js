var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../app/models/user');
var sessionConfig = require('../config/session.js');

/*
 * Authentication for token
 */

router.post('/auth', function(req, res) {
    // find the user
    User.findOne({
        'local.username' : req.body.username
    }, function(err, user) {

        if (err)
            throw err;

        if (!user) {
            res.json({success: false, message: 'Authentication Failure'});
        } else if (user) {
            // Check Password
            if (!user.validPassword(req.body.password)) {
                res.json({success: false, message: 'Authentication Failure-2'});
            } else {

                // Create token
                var token = jwt.sign(user, sessionConfig.secret, {
                    expiresIn: 60*60*2 // set expireTime
                });
                // JSON return token
                res.json({success: true, message: 'Token info', token: token});
            }
        }
    });
});

//This is a middleware for token authentication
router.use(function(req, res, next) {
    //check token in the message
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // pasre token
    if (token) {
        // Verify token
        jwt.verify(token, sessionConfig.secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'invalid token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // no token Error
        return res.status(403).send({
            success: false,
            message: 'No token provide in the message'
        });

    }
});


/**
  *  import user Model and controller
  */

 router.get('/checkadmin',function(req,res,next){
      res.send(req.decoded._doc.role);  // this is used for check privilegs
  });

var User = require('../app/models/user');
var userControl = require('../app/controllers/userMgmt/users.controller');

router.route('/users')

// create a user (accessed at POST http://localhost:8080/api/users)
    .post(userControl.create).get(userControl.list);



router.get('/user/:username', userControl.read);
router.param('username', userControl.userByName);

module.exports = router;
