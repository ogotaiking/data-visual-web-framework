// config/session.js
module.exports = {
      resave: true,
      saveUninitialized: true,
      key: 'passport_cookie',
      cookie: {MaxAge: 1000 * 60 * 60 * 24},
      resave: true,
      saveUninitialized: true
};
