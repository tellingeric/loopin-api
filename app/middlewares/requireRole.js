/*
User role permission check.
Used after user token authentication (validateRequest.js)
Assume req.decoded._doc is ready, otherwise auth failed.
 */
var config = require('./../../config');

module.exports = function(role){
    return function(req, res, next){
        var userType = (req.decoded && req.decoded._doc)?req.decoded._doc.type:null;
        if(userType === role)
            next();
        else
            res.status(403).send({
                success: false,
                message: 'You do not have permission to: ' + req.method + ' ' + req.path
            });
    }
};
