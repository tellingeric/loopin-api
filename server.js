var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');

var config = require('./config');

var User = require('./app/models/UserModel');
var Event = require('./app/models/EventModel');
var Vendor = require('./app/models/VendorModel');

//==============================================
var app = express();
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.connect(config.database);

app.set('secretCode', config.secret);

// CORS
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', require('./app/routes'));




// =============================================================================
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('LoopIn-API on port ' + server.address().port);
});
