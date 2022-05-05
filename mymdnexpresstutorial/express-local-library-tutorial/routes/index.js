//loads express module 
var express = require('express');
//and uses it to create an express router object
var router = express.Router();

//the router specifies a route on that object - this is what allows the file to be imported as app.js without the filepath

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//the "next" argument makes the callback a middleware function rather than a simple route callback. While the code doesn't currently use the next arguement, it may be useful in the future if you want to add multiple route handlers to the "/" route path

//exports the router from the module
module.exports = router;
