var jwt = require('jsonwebtoken');
var config = require('./../../config');

module.exports = function(req, res, next) {
          // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token']; // decode token


      // var token_type = req.headers['x-access-type'] || 'local'





      if (token) {


        // if token_type == 'local'
        //   proceed as normal
        // else {
        //
        //   User.find { type: token_type,  token: token}, function(err, user){
        //
        //     if (err){
        //       use the following passport auth as least as possible, create too much latency
        //       passport.authenticate('auth/' + token_type, token, profile_id)
        //
        //       user.find(profile_id, function(err, user2){
        //         if (err)
        //           create user based on profile_id and token
        //         else {
        //           user.token = new token
        //           user save
        //           auth success
        //
        //         }
        //       })
        //
        //     }
        //
        //    Oatuh(token, secret, appid)
        //    passport.validate(token, 'facebook_strategy')
        //     jwt.verify(token, function(err, decoded){
        //       user.find(decoded.profile_id, function(err, user){
        //         if (err)
        //           create user;
        //         else {
        //           auth success
        //         }
        //       })
        //     })
        //   })
        //
        // }


        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
          if (err) {
            console.log(JSON.stringify(err));
              return res.status(403).send({
                    success: false,
                    message: 'Failed to authenticate token.'
                  });
          } else {

            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            //console.log(decoded);
            //res.status(200).json({
            //        success: true,
            //        message: 'Token authenticated successfully!'
            //      });
            next();
          }
        });
      } else {

        // if there is no token
        // return an HTTP response of 403 (access forbidden) and an error message
        return res.status(403).send({
          success: false,
          message: 'No token provided.'
        });
      }
};
