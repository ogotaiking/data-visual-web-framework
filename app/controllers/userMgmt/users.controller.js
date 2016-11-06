// load up the user model
var User = require('../../models/user');

exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.list = function(req, res, next) {
    User.find({}, 'local.username local.email', {
        skip: 0,
        limit: 10
    }, function(err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
    User.findOne({
        _id: id
    }, function(err, user) {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

exports.userByName = function(req, res, next, username) {
    console.log(username);
    User.findOne({
        'local.username': username
    }, function(err, user) {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};
