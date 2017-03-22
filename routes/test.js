var express = require('express');
var router = express.Router();
var passport = require('passport');


var User   = require('../app/models/user');
/* GET users listing. */
router.get('/userlist', function(req, res, next) {
  User.find({},'local.username local.email', function(err, user) {
      if (err)
          return next(err);
      else
          {
            console.log(user);
            res.json(user);
          }
  });
});

router.get('/test/:aaa', function(req, res, next) {
  res.send(req.params);
});

var userControl = require('../app/controllers/userMgmt/users.controller');

router.post('/user',userControl.create);
router.get('/user',userControl.list);

router.get('/user/:username',userControl.read);

router.param('username',userControl.userByName);


module.exports = router;
