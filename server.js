var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');
var passport = require('passport');
var dbConfig = require('./config/database');
var User = require('./app/models/user');
var jwt = require('jwt-simple');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('combined', {
    stream: {write: function(str)
{
    accessLogStream.write(str);
    console.log(str);
}}
}));

app.use(passport.initialize());

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
app.all('/api/v1/*', [require('./app/middlewares/validateRequest')]);

app.use('/', require('./app/routes'));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('LoopIn api listening on port ' + server.address().port);
});
