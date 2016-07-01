var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');

var config = require('./config');


//var User = require('./app/models/User');

//==============================================
var app = express();
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(config.database);

app.set('secretCode', config.secret);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', require('./app/routes'));


// =============================================================================
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('LoopIn-API on port ' + server.address().port);
});
