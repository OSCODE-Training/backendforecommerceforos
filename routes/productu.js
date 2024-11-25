var express = require('express');
var router = express.Router();
var Product = require("../src/models/product.model");

router.get('/get_all_product',async function(req, res, next) {
    //   res.render('index', { title: 'Express' });
    try{
    var product = await Product.find()  
    res.status(200).json({ status: true, message: "Get Data Successfully",data:product })
    }catch(e){
        console.log("sssssssssssssssssssssssss:",e)
        res.status(500).json({ status: false, message: "Server Error" })
        
      }
    console.log(product)
    });

    router.post('/get_specific_products_by_category',async function(req, res, next) {
        //   res.render('index', { title: 'Express' });
        try{
        var {categoryid} = req.body
        var product = await Product.find({categoryid:categoryid})  
        res.status(200).json({ status: true, message: "Get Data Successfully",data:product })
        }catch(e){
            console.log("sssssssssssssssssssssssss:",e)
            res.status(500).json({ status: false, message: "Server Error" })
            
          }
        console.log(product)
        });    

module.exports = router;

