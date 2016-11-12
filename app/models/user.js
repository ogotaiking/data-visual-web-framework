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
    roleLevel   : {
      type: Number,
      required: true,
      min: 0,
      max: 31,
      default: 0
      /*
       * 0: Tenant-Viewer
       * 7: Tenant-Operator
       * 15: Tenant-Admin
       *
       * roleLevel > 15 could support multi-Tenant management
       *
       * 16: System-Viewer <-Low Level online Support Engineer
       * 17: System-Operator <-High Level online Support Engineer
       * 31: System-Admin
       */
    },
    locale : {
        type: String,
        enum: ['en', 'en-US', 'zh-TW', 'zh', 'zh-CN'],
        default: ['en']
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
