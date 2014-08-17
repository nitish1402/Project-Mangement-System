/**
* Module dependencies
*/

// BASE SETUP
// ==============================================
var express        = require('express'); //required for choosing express service
var pg             = require('pg');
var bodyParser     = require('body-parser'); //Middle ware for parsing data like JSON data
var methodOverride = require('method-override'); //provide PUT and DELETE where client doesn't support it
var morgan         = require('morgan'); //logging into the console
var routes         = require('./routes'); //requesting services from routes folder
var user_ser       = require('./routes/services/user');
var services       = require('./routes/services/services');
var secret         = require('./routes/services/config');
var port           = process.env.PORT || 8080; //setting port
var router         = express.Router(); //using express router
var expressJwt     = require('express-jwt');
var app = module.exports = express();
// ===============================================

/**
* Configuration
*/

// all environments
app.use('/user', expressJwt({secret: secret.secret}))
app.use(bodyParser.json()); // parse application/json   // pull information from html in POST
app.use(methodOverride());                        // simulate DELETE and PUT
//app.use(morgan('dev')); 					                // log every request to the console
app.engine('html', require('ejs').renderFile);    // use ejs to render html
app.use(express.static(__dirname + '/public'));   // set the static files location /public/img will be /img for users
app.set('views', __dirname + '/views');
app.use('/', router);


var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  //configure stuff here
 // console.log('development')
}

router.get('/', routes.index);
router.get('/partials/:name', routes.partials);
router.get('/partials/user/:name', routes.Upartials);

/*
router.get('/services/product/:id', services.product);
router.put('/services/product/:id', services.editProduct);
router.delete('/services/product/:id/edit/:id', services.deleteProduct)
*/
router.post('/user/signin', user_ser.signin);
router.get('*', routes.index);


/**
* Start Server
*/

app.listen(port);
//console.log('App listening on port ' + port);
