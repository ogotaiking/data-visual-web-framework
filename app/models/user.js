// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    role   : {
      type: String,
      required: true,
      enum: ['Admin', 'Operator','viewer'],
      default: ['viewer']
    },
    local            : {
        username     : {
          type: String,
          trim: true,
          unique: true,
          index: true,
          required: true
        },
        email        : {
          type: String,
          trim: true,
          unique: true,
          index: true,
          required: true
        },
        password     : String
    }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
