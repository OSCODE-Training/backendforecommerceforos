var express = require('express');
var router = express.Router();
var Category = require("../src/models/category.model");


router.get('/get_all_category',async function(req, res, next) {
    //   res.render('index', { title: 'Express' });
    try{
    var category = await Category.find()  
    res.status(200).json({ status: true, message: "Get Data Successfully",data:category })
    }catch(e){
        console.log("sssssssssssssssssssssssss:",e)
        res.status(500).json({ status: false, message: "Server Error" })
        
      }
    console.log(category)
    });

module.exports = router;
