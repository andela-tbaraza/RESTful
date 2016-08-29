// call the packages we need

const express = require('express');
const app = express(); // creates an instance of express app
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bear = require('./app/models/bear')

mongoose.connect('mongodb://tonie:tonie@ds017896.mlab.com:17896/restful')

// configure our app to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//set our port
let port = process.env.PORT || 8080;

// ROUTES
// =============================================================================

const router = express.Router(); // instamce of the express Router

// Setting middleware to be used for all requests

router.use(function(req, res, next) {
  console.log('something is happening');
  next();
});

// testing the route

router.get('/', function (req, res) {
  res.json({message: 'yaaay'})
});

// more routes will come below

router.route('/bears')
 // create a bear (will be accessed via http://localhost/8080/api/bears)
  .post(function(req, res) {
    const bear = new Bear(); //create an instance of the bear model
    bear.name = req.body.name // sets the bear's name that comes from the request

    //save the bear
    bear.save(function(err){
      if(err)
        res.send(err)

      res.json({message: 'Bear created'});
    });
  })

  // get all bears (will be accessed via http://localhost/8080/api/bears)
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err)
        res.send(err)

      res.json(bears)
    });
  });

router.route('/bears/:bear_id')
// get a bear with the specified id (will be accessed via http://localhost/8080/api/bears/:bear_id)
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if(err)
        res.send(err)

      res.json(bear);
    });
  })

// update the user with the specified id

  .put(function(req, res) {
    findById(req.params.bear_id, function(err, bear) {
      if(err)
        res.send(err)

      bear.name = req.body.name; // updat the bear name

      //save the bear

      bear.save(function(err) {
        if(err)
          res.send(err)

        res.json({message: 'bear updated'})
      });
    });
  })

  // delate a bear
    .delete(function(req, res) {
      Bear.remove({
        id: req.params.bear_id
      }, function(err, bear) {
        if(err)
          res.send(err)

        res.json({message: 'Successfully deleted'});
      });
    });

// REGISTE OUR ROUTES----------------
// all routes will be prefixed with /api
app.use('/api', router)

// Fire up the server
app.listen(port);
console.log('magic is already happening at ' + port);
