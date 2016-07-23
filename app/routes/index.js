var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');

var Users = require('./users');
var Events = require('./events');
var Vendors = require('./vendors');
var Products = require('./products');
var Orders = require('./orders');


// USERS
router.get('/api/users', Users.getAll);
router.post('/api/users/register', Users.create);
router.post('/api/users/login', Users.login);
router.get('/api/users/auth', Users.auth);

router.delete('/api/users/:user_id', Users.remove);
// Protect dashboard route with JWT
router.get('/api/users/dashboard', passport.authenticate('jwt', { session: false }), 
	function(req, res) {
  		res.send('It worked! User id is: ' + req.user._id + '.');
	}
);

// VENDORS
router.get('/api/vendors', Vendors.getAll);
router.post('/api/vendors', Vendors.createOne);
router.get('/api/vendors/:vendor_id', Vendors.getOne);
router.post('/api/vendors/:vendor_id', Vendors.updateOne);
router.delete('/api/vendors/:vendor_id', Vendors.deleteOne);

// PRODUCTS
router.get('/api/products', Products.getAll);
router.post('/api/products', Products.createOne);
router.get('/api/products/:product_id', Products.getOne);
router.post('/api/products/:product_id', Products.updateOne);
router.delete('/api/products/:product_id', Products.deleteOne);

// EVENTS
router.get('/api/events', Events.getAll);
router.post('/api/events', Events.createOne);
router.get('/api/events/:event_id', Events.getOne);
router.post('/api/events/:event_id', Events.updateOne);
router.delete('/api/events/:event_id', Events.deleteOne);

// EVENTS
router.get('/api/orders', Orders.getAll);
router.post('/api/orders', Orders.createOne);
router.get('/api/orders/:order_id', Orders.getOne);
router.post('/api/orders/:order_id', Orders.updateOne);
router.delete('/api/orders/:order_id', Orders.deleteOne);

//DEBUG ROUTES, MUST REMOVE IN PRODUCTION
router.delete('/api/vendors', Vendors.deleteAll);
router.delete('/api/products', Products.deleteAll);
router.delete('/api/events', Events.deleteAll);
router.delete('/api/orders', Orders.deleteAll);


// GLOBAL ROUTES
router.get('/', function (req, res) {
    res.send('LoopIn-API');
});
router.get('*', function (req, res) {
    res.redirect('/');
});


module.exports = router;
