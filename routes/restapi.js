var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../app/models/user');
var sessionConfig = require('../config/session.js');
var fs = require('fs');
sessionConfig.secret = fs.readFileSync(__dirname + '/../config/secretkey','utf8');
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
            res.json({success: false, message: 'Invalid Username'});
        } else if (user) {
            // Check Password
            if (!user.validPassword(req.body.password)) {
                res.json({success: false, message: 'Wrong Password'});
            } else {

                // Create token
                var token = jwt.sign(user, sessionConfig.secret, {
                    expiresIn: 60*60*2 // set expireTime
                });
                // JSON return token
                res.json({success: true, message: 'Enjoy Token', token: token});
            }
        }
    });
});

//This is a middleware for token validation
router.use(function(req, res, next) {
    //For Web ajax purpose:
    //if this session has cookie , will not require any aditional token
    //console.log(req.user.role);
    if (req.isAuthenticated()){
        req.previledge = req.user.role;
        return next();
    }

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
                req.previledge = req.decoded._doc.role;
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
  *  import RestAPI module here
  */


//Role check section , maybe it could be a middle ware for different API
 router.get('/checkadmin',function(req,res,next){
      res.send(req.previledge);
  });




var User = require('../app/models/user');
var userControl = require('../app/controllers/userMgmt/users.controller');

router.route('/users')

// create a user (accessed at POST http://localhost:8080/api/users)
    .post(userControl.create).get(userControl.list);



router.get('/user/:username', userControl.read);
router.param('username', userControl.userByName);

module.exports = router;
