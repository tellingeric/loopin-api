var express = require('express');
var router = express.Router();

var Users = require('./users');
var Events = require('./Events');
var Vendors = require('./Vendors');


router.get('/', function(req, res) {
    res.send('LoopIn-API');
});

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
