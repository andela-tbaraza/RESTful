// call the packages we need

const express = require('express');
const app = express(); // creates an instance of express app
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const models = require('./models/bear')

mongoose.connect('mongodb://tonie:tonie@ds017896.mlab.com:17896/restful')

// configure our app to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//set our port
let port = process.env.PORT || 8080;

// ROUTES
// =============================================================================

const router = express.Router(); // instamce of the express Router

// testing the route

router.get('/', function (req, res) {
  res.json({message: 'yaaay'})
});

// more routes will come below

// REGISTE OUR ROUTES----------------
// all routes will be prefixed with /api
app.use('/api', router)

// Fire up the server
app.listen(port);
console.log('magic is already happening at ' + port);
