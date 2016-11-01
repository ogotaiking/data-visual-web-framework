var passport = require('passport');
var isLoggedIn = require('./authCheck');
// route middleware to ensure user is logged in
module.exports = function(url) {
    return function(req, res, next) {
        if (req.url.indexOf(url) === 0) {
            console.log(req.url);
            return isLoggedIn(req, res, next);
        } else
            next();
    }
}
