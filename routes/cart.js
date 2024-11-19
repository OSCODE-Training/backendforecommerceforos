

var express = require('express');
var router = express.Router();
var Product = require("../src/models/product.model");
var Order = require('../src/models/order.model');
var Cart = require("../src/models/cart.model");
/* GET home page. */
router.post('/add_new_item_in_cart', function(req, res, next) {
//   res.render('index', { title: 'Express' });
try{


var body = {...req.body}
var cart = new Cart(body)
cart.save().then((saveData) => {
    if (cart == saveData) {
      res.status(200).json({ status: true, message: "Submitted Successfully" })
    } else {
      res.status(200).json({ status: false, message: "Database Error" })
    }
  })
  }catch(e){
    res.status(500).json({ status: false, message: "Server Error" })

  }
console.log(cart)
});


router.get('/get_all_items_in_cart',async function(req, res, next) {
    //   res.render('index', { title: 'Express' });
    try{
    var cart = await Cart.find()  
    res.status(200).json({ status: true, message: "Get Data Successfully",data:cart })
    }catch(e){
        console.log("sssssssssssssssssssssssss:",e)
        res.status(500).json({ status: false, message: "Server Error" })
        
      }
    console.log(cart)
    });


    router.delete('/delete_item_in_cart',async function(req, res, next) {
        //   res.render('index', { title: 'Express' });
        try{
        const {orderid} = req.body
       
        const deleteCartItem = await Cart.findOneAndDelete({ _id: orderid });
if (!deleteCartItem) {
    return res.status(404).json({
        status: false,
        message: "Order not found"
    });
}

res.status(200).json({
    status: true,
    message: "Order deleted successfully",
    data: deleteCartItem
});

}catch(e){
res.status(500).json({ status: false, message: "Server Error" })
}
}); 


module.exports = router;
