var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var multer = require('multer');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

var Users = require('./users');
var Events = require('./events');
var Vendors = require('./vendors');
var Products = require('./products');
var Orders = require('./orders');
var Assets = require('./assets');
var AssetModel = require('../models/AssetModel');
var Stats = require('./stats');
var UserModel = require('../models/UserModel');

var requireRole = require('../middlewares/requireRole');

// Load Chance
var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();

// USERS
router.get('/api/users', Users.getAll);
router.post('/register', Users.create);
router.post('/login', Users.login);
router.post('/logout', Users.logout);
router.post('/forgetPassword', Users.forgetPassword);
router.post('/addnewdevice/:user_id', Users.addNewDevice);
router.delete('/api/users/:user_id', Users.remove);
router.get('/api/me', jsonParser, Users.getUser);
router.put('/api/users/:user_id', Users.updateOne);
router.get('/reset/:token', Users.validatePasswordResetToken);
router.post('/reset/:token', Users.resetPassword);
router.get('/user/location/:user_id', Users.getUserLocation);
router.put('/user/location/:user_id', Users.saveUserLocation);

// VENDORS
router.get('/api/vendors', Vendors.getAll);
router.post('/api/vendors', Vendors.createOne);
router.post('/api/vendors/random', Vendors.random);
router.get('/api/vendors/:vendor_id', Vendors.getOne);
router.put('/api/vendors/:vendor_id', Vendors.updateOne);
router.delete('/api/vendors/:vendor_id', requireRole('admin'), Vendors.deleteOne);

// PRODUCTS
router.get('/api/products', Products.getAll);
router.post('/api/products', Products.createOne);
router.get('/api/products/:product_id', Products.getOne);
router.put('/api/products/:product_id', Products.updateOne);
router.delete('/api/products/:product_id', Products.deleteOne);

// EVENTS
router.get('/api/events', Events.getAll);
router.post('/api/events', Events.createOne);
router.get('/api/events/:event_id', Events.getOne);
router.put('/api/events/:event_id', Events.updateOne);
router.delete('/api/events/:event_id', Events.deleteOne);


// ORDERS
router.get('/api/orders', Orders.getAll);
router.post('/api/orders', Orders.createOne);
router.get('/api/orders/:order_id', Orders.getOne);
router.get('/api/orders/byUser/:user_id', Orders.getByUser);
router.put('/api/orders/:order_id', Orders.updateOne);
router.delete('/api/orders/:order_id', Orders.deleteOne);


// Assets

//router.post('/api/orders', Orders.createOne);
//upload
router.post('/api/upload',function(req,res){

    var user = req.decoded._doc;

    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/assets');
        },
        filename: function (req, file, callback) {
            callback(null, user._id + '_' + Date.now() + '_' +  chance.hash({length: 4}) + '_' + file.originalname);
        }
    });

    var upload = multer(
        {
            storage : storage,
            limits: {
                fileSize: 20 * 1024 * 1024
            }
        }).any();

    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        else {
            var file = req.files[0];

            var item = new AssetModel();
            item.orig_filename = file.originalname;
            item.filetype = file.mimetype;
            item.unique_filename = file.filename;
            item.path = file.path;
            item.size = Number(file.size);
            item.created_by = user._id;

            item.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ success: false, message: 'File uploaded, but failed to create asset db record.'});
                }
                res.status(201).json({ success: true, message: 'File uploaded, and Asset db record created' });
            });
        }
    });
});

//Note: Get, update only touches db record, not file. Delete will delete file(s) too.
router.get('/api/assets', Assets.getAll);
router.get('/api/assets/:asset_id', Assets.getOne);
router.put('/api/assets/:asset_id', Assets.updateOne);
router.delete('/api/assets/:asset_id', Assets.deleteOne);

//STATS
router.get('/api/stats', Stats.getStats);


//DEBUG ROUTES, MUST REMOVE IN PRODUCTION !!!
router.delete('/api/vendors', Vendors.deleteAll);
router.delete('/api/products', Products.deleteAll);
router.delete('/api/events', Events.deleteAll);
router.delete('/api/orders', Orders.deleteAll);
router.delete('/api/assets', Assets.deleteAll);

router.post('/api/eventdeliveries', Events.createOneDelivery);


// GLOBAL ROUTES
router.get('/', function (req, res) {
    // res.send('LoopIn-API');
    res.redirect('/index.html');

    // res.render('index.ejs');
});


// router.get('*', function (req, res) {
//     res.redirect('/');
// });


module.exports = router;
