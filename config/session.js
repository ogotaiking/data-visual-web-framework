// config/session.js
module.exports = {
      secret: 'K3v!n!s@1!ttleP!G', // session secret
      resave: true,
      saveUninitialized: true,
      key: 'passport_cookie',
      cookie: {MaxAge: 1000 * 60 * 60 * 24},
      resave: true,
      saveUninitialized: true 
};
