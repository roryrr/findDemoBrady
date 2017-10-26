'use strict';
var express = require('express');
var bodyParser = require('body-parser');
// var session = require('express-session');
var request = require('request');
var app = express();
// var MongoStore = require('connect-mongo')(session);
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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use(session({
//     secret: 'foo',
//     saveUninitialized: true,
//     resave: true,
//     store: new MongoStore({ mongooseConnection: mongoose.connection })
// }));

// Connect to MongoDB and create/use database called todoAppTest
// var Todo = require('./Todo.js');
var barneysUser;
var productDetailsSchema = new mongoose.Schema({
  userId: String,
  id: String,
  image: mongoose.SchemaTypes.Url,
  categories: [String],
  identifier: String
});
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todoAppTest', {useMongoClient: true});

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
app.post('/login', function(req, res){
  barneysUser = req.body.key1;
  console.log(barneysUser);
  console.log('done abba');
  // req.session.user = barneysUser;
  // req.session.save();
  // res.redirect("/overlay.html");
});
// app.get('/cookie', function(req, res) {
//   res.cookie('username', barneysUser);
//   console.log("sett");
// });
app.post('/viewed', function(req, res){
  // console.log(req.session.user);
    var uid = req.body.name;
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
                    "userId": uid,
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
    var uid = req.body.name;
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
                    "userId": uid,
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
  var uid = req.body.name;
  productDetailsCollection.remove({userId: uid}, function (err, removed) {
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

//
// if ( (username == "barneysu01" && password == "V&8sySC5") || (username == "barneysu02" && password == "7R$wVf4V") || (username == "barneysu03" && password == "Yf@dm2Lq") || (username == "barneysu04" && password == "HaK@YK9z") || (username == "barneysu05" && password == "JG&qj3JL") || (username == "barneysu06" && password == "M_rd3Vyd") || (username == "barneysu07" && password == "D?9Lp6rP") || (username == "barneysu08" && password == "aKE59s@G") || (username == "barneysu09" && password == "S_5TrMjh") || (username == "barneysu10" && password == "6b6@HZk7")){
// CONTACTS API ROUTES BELOW
