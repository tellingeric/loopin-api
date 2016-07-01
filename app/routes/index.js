var express = require('express');
var router = express.Router();

var Users = require('./Users.js');
var Events = require('./Events.js');
var Vendors = require('./Vendors.js');

/*
router.use(function(req, res, next){

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token){
    jwt.verify(token, app.get('secretCode'), function(err, decoded){
      if (err) {
        return res.json({success : false, message:'failed to authenticate token'});
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    });

  }

});
*/

// USERS
router.get('/api/users', Users.getAll);
router.post('/api/users', Users.create);
router.delete('/api/users/:user_id', Users.remove);

// VENDORS
router.get('/api/vendors', Vendors.getAll);
router.post('/api/vendors', Vendors.create);
router.delete('/api/vendors/:vendor_id', Vendors.remove);

// EVENTS
router.get('/api/events', Events.getAll);
router.post('/api/events', Events.create);
router.delete('/api/events/:event_id', Events.remove);


module.exports = router;
