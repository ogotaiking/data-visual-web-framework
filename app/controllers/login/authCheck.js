var passport = require('passport');

// route middleware to ensure user is logged in
module.exports = function (req, res, next) {
    //console.log('authMidware has been called..........-->');
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
