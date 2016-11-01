var express = require('express');
var router = express.Router();
var passport = require('passport');


/**
  * import user Model and controller
  */
var User   = require('../app/models/user');
var userControl = require('../app/controllers/users.controller');


router.route('/users')

    // create a user (accessed at POST http://localhost:8080/api/users)
    .post(userControl.create)
    .get(userControl.list);

router.get('/user/:username',userControl.read);
router.param('username',userControl.userByName);


module.exports = router;
