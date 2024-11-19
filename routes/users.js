var express = require('express');
var router = express.Router();
var User = require("../src/models/user.model");
var Category = require("../src/models/category.model");
var Product = require("../src/models/product.model");
var Transaction = require("../src/models/transaction.model");
var Order = require("../src/models/order.model");
var Cart  = require("../src/models/cart.model");
var Userquery = require("../src/models/userquery.model");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/create_schema",function(req,res,next){
  var US = new User()
  var CS = new Category()
  var PS = new Product()
  var TS = new Transaction()
  var OS = new Order()
  var CS = new Cart()
  var UQS = new Userquery()
})


module.exports = router;
