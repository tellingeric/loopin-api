var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({

  local: {
      username: {
        type: String,
        lowercase: true,
        unique: true
      },
      password: {
        type: String
      }
  },
  facebook: {
      id           : String,
      email        : String,
      name         : String,
      token        : String
  },
  google: {
      id           : String,
      email        : String,
      name         : String,
      token        : String
  },
  wechat: {
      id           : String,
      displayName  : String,
      username     : String,
      token        : String
  },
  email: {
    type: String,
    lowercase: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['customer', 'vendor', 'admin'],
    default: 'customer'
  },
  devices:[{
    device_token: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now 
    }
  }]
});

// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre('save', function (next) {
  var user = this;
  if (user.password && (this.isModified('password') || this.isNew)) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};




module.exports = mongoose.model('User', UserSchema);
