var express = require('express');
var router = express.Router();
var passport = require('passport');

var isLoggedIn = require('../app/controllers/login/authCheck');
var localeArr = require('../app/controllers/locales/transArr');

/* GET home page. */
router.get('/',isLoggedIn, function(req, res, next) {
    res.render('index', {
        title: 'ThinCPE Cloud',
        name: 'Kevin',
        locale: res.locals.locale
    });
});

// PROFILE SECTION =========================
router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('profile.ejs', {
        user: req.user
    });
});

// LOGOUT ==============================
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

// locally --------------------------------
// LOGIN ===============================
// show the login form
router.get('/login', function(req, res, next) {
    res.render('login.ejs', {
        message: localeArr(res,req.flash('loginMessage'))
    });
});
// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));


// SIGNUP =================================
// show the signup form
router.get('/signup', function(req, res, next) {
    res.render('signup.ejs', {
        message: localeArr(res,req.flash('signupMessage'))
    });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));



module.exports = router;
