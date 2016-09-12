const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');
var GoogleTokenStrategy = require('passport-google-id-token');

const User = require('../models/UserModel');
const config = require('./../../config');
var configAuth = require('./auth');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
  };

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));

  passport.use(new FacebookTokenStrategy({
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret
    }, function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({facebookId: profile.id}, function (error, user) {
        return done(error, user);
      });
    }
  ));
  passport.use(new GoogleTokenStrategy({
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret
    },
    function(parsedToken, googleId, done) {
      User.findOrCreate({ googleId: googleId }, function (err, user) {
        return done(err, user);
      });
    }
  ));
};