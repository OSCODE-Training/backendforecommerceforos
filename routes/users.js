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


router.get("/get_data_all_a", async function(req,res,next){
  try {
    var user = await User.aggregate([{$project:{$username:{$toUpper:"$username"}}}])
    res.status(200).json({ status: true, message: "Get Data Successfully", data: user })
  } catch (e) {
    console.log("sssssssssssssssssssssssss:", e)
    res.status(500).json({ status: false, message: "Server Error" })

  }
  console.log(user)
})

module.exports = router;
