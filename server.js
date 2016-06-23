var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var User = require('./app/models/User');

//==============================================
var app = express();
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://admin:admin@ds021694.mlab.com:21694/yummyt-test')

var port = 3000;
var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    //res.json({ message: 'hooray! welcome to our api!' });
    res.send('Hello World!');
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', require('./app/routes'));


// =============================================================================
app.listen(port, function() {
  console.log('Magic happens on port ' + port);
});
