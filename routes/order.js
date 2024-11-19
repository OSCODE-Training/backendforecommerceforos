

var express = require('express');
var router = express.Router();
var Product = require("../src/models/product.model");
var Order = require('../src/models/order.model');
/* GET home page. */
router.post('/add_new_order', function(req, res, next) {
//   res.render('index', { title: 'Express' });
try{


var body = {...req.body}
var order = new Order(body)
order.save().then((saveData) => {
    if (order == saveData) {
      res.status(200).json({ status: true, message: "Submitted Successfully" })
    } else {
      res.status(200).json({ status: false, message: "Database Error" })
    }
  })
  }catch(e){
    res.status(500).json({ status: false, message: "Server Error" })

  }
console.log(order)
});




router.get('/get_all_order',async function(req, res, next) {
    //   res.render('index', { title: 'Express' });
    try{
    var order = await Order.find()  
    res.status(200).json({ status: true, message: "Get Data Successfully",data:order })
    }catch(e){
        console.log("sssssssssssssssssssssssss:",e)
        res.status(500).json({ status: false, message: "Server Error" })
        
      }
    console.log(order)
    });


    router.delete('/delete_order',async function(req, res, next) {
        //   res.render('index', { title: 'Express' });
        try{
        const {orderid} = req.body
       
        const deleteOrder = await Order.findOneAndDelete({ _id: orderid });
if (!deleteOrder) {
    return res.status(404).json({
        status: false,
        message: "Order not found"
    });
}

res.status(200).json({
    status: true,
    message: "Order deleted successfully",
    data: deleteOrder
});

}catch(e){
res.status(500).json({ status: false, message: "Server Error" })
}
});


router.get('/users-orders',async function(req, res, next) {
  //   res.render('index', { title: 'Express' });
 
//   var order = await Order.aggregate([{
//     $lookup: {
//       from: "products",      // The name of the collection to join
//       localField: "productid",  // The field from the current collection
//       foreignField: "_id", // The field from the target collection
//       as: "productData" 
//   },
//   $lookup: {
//     from: "categories",      // The name of the collection to join
//     localField: "categoryid",  // The field from the current collection
//     foreignField: "_id", // The field from the target collection
//     as: "categoryData" 
// }
// }],

//   {$unwind:"$productData"},
//   {$unwind:"$categoryData"}
// ).then((result)=>{
//   res.status(200).json({ status: true, message: "Get Data Successfully",data:result })
// })

const order = await Order.find().populate({ path: 'productid', select: 'productname -_id' }).populate({ path: 'categoryid', select: 'categoryname -_id' })
res.status(200).json({ status: true, message: "Get Data Successfully",data:order })
})


module.exports = router;
