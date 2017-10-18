const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
let app = express();
var router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
require('mongoose-type-url');
require('dotenv').config();
var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// Load mongoose package
var mongoose = require('mongoose');
// Connect to MongoDB and create/use database called todoAppTest
// var Todo = require('./Todo.js');

var productDetailsSchema = new mongoose.Schema({
  id: String,
  image: mongoose.SchemaTypes.Url,
  categories: [String],
  identifier: String
});
mongoose.connect('mongodb://ec2-52-91-217-242.compute-1.amazonaws.com:27017//todoAppTest', {useMongoClient: true});

var productDetailsCollection = mongoose.model("productDetailsCollection", productDetailsSchema);


/* GET /todos listing. */
app.get('/', function(req, res) {
  productDetailsCollection.find({},{_id:0},function (err, todos) {
    if (err) return res.json({"err": "hi"});
    else {
      res.json(todos);
    }
  });
});
app.post('/viewed', function(req, res){
    var req_url = process.env.GET_PRODUCTS_URL;
    var queryParameters = { apiKey: process.env.API_KEY,
          apiClientKey: process.env.API_CLIENT_KEY,
          productId: req.body.productId};
      request({
        uri: req_url,
        qs: queryParameters,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 5.1.1; A1 Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.116 Mobile Safari/537.36'
          },
        method: 'GET',
        }, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                //parsing the json response from RR cloud
                body = JSON.parse(body);
                if(body.status == "error"){
                  console.log("nenu cheppala");
                }
                else {
                  var rr_data;
                  rr_data = {
                    "id": body.products[0].id,
                    "image": cloudinary.url(body.products[0].imageURL,{ type: 'fetch', height: 50, width: 50, background: "white", crop: "pad", quality: 100, fetch_format: 'jpg'}),
                    "categories": body.products[0].categoryIds,
                    "identifier": "viewed"
                  };
              var myDetails = new productDetailsCollection(rr_data);
              myDetails.save()
              .then(item => {
                res.send("item saved to database");
              })
              .catch(err => {
                res.status(400).send("unable to save to database");
              });

                  // sendGenericMessageForFavoriteItems(sid, rr_array);
              } }else {
                // sendTextMessage(sid, 'Pavan, ERROR');
              }
            });
});

app.post('/purchased', function(req, res){
    var req_url = process.env.GET_PRODUCTS_URL;
    var queryParameters = { apiKey: process.env.API_KEY,
          apiClientKey: process.env.API_CLIENT_KEY,
          productId: req.body.productId};
      request({
        uri: req_url,
        qs: queryParameters,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 5.1.1; A1 Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.116 Mobile Safari/537.36'
          },
        method: 'GET',
        }, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                //parsing the json response from RR cloud
                body = JSON.parse(body);
                if(body.status == "error"){
                  console.log("nenu cheppala");
                }
                else {
                  var rr_data;
                  rr_data = {
                    "id": body.products[0].id,
                    "image": cloudinary.url(body.products[0].imageURL,{ type: 'fetch', height: 50, width: 50, background: "white", crop: "pad", quality: 100, fetch_format: 'jpg'}),
                    "categories": body.products[0].categoryIds,
                    "identifier": "purchased"
                  };
              var myDetails = new productDetailsCollection(rr_data);
              myDetails.save()
              .then(item => {
                res.send("item saved to database");
              })
              .catch(err => {
                res.status(400).send("unable to save to database");
              });

                  // sendGenericMessageForFavoriteItems(sid, rr_array);
              } }else {
                // sendTextMessage(sid, 'Pavan, ERROR');
              }
            });
});


app.post('/delete', function(req, res){
  productDetailsCollection.remove({}, function (err, removed) {
    console.log("deleting from here");
    res.send("item deleted to database");
  });
  // mongoose.connection.close();
});

module.exports = app;

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

// CONTACTS API ROUTES BELOW
