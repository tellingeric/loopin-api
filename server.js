var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var passport = require('passport');

//==============================================
var app = express();
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

require('./app/config/passport')(passport);// pass passport for configuration

app.set('secretCode', config.secret);

// CORS
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,x-access-token');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }))

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
app.all('/api/*', [require('./app/middlewares/validateRequest')]);

//rate limiter
var RateLimit = require('express-rate-limit');

app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

var apiLimiter = new RateLimit({
  windowMs: 1*60*1000, //ms
  max: 100,
  delayMs: 0 // disabled
});

// only apply to requests that begin with /api/
app.use('/api/', apiLimiter);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', require('./app/routes'));


// public
// app.set('view engine', 'ejs'); // set up ejs for templating

app.use(express.static(__dirname + '/public'));


// =============================================================================
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('LoopIn-API on port ' + server.address().port);
});
