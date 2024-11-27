var express = require('express');
var router = express.Router();
var upload = require("../src/middlewares/multer.middleware");
const {verifyTokenAndRole}  = require("../src/middlewares/auth.middleware");

var Product = require("../src/models/product.model");
/* GET home page. */
router.post('/add_new_product',verifyTokenAndRole(['admin']), upload.single("image"), function (req, res, next) {
  //   res.render('index', { title: 'Express' });
  try {


    var body = { ...req.body, "image": req.file.filename }
    var product = new Product(body)
    product.save().then((saveData) => {
      if (product == saveData) {
        res.status(200).json({ status: true, message: "Submitted Successfully" })
      } else {
        res.status(200).json({ status: false, message: "Database Error" })
      }
    })
  } catch (e) {
    res.status(500).json({ status: false, message: "Server Error" })

  }
  console.log(product)
});


router.get('/get_all_product',verifyTokenAndRole(['admin','user']),async function(req, res, next) {
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


router.post('/get_specific_products_by_category',verifyTokenAndRole(['admin','user']),async function(req, res, next) {
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

router.post('/get_specific_product',verifyTokenAndRole(['admin']), async function (req, res, next) {
  //   res.render('index', { title: 'Express' });
  try {
    var { productid } = req.body
    var product = await Product.findOne({ _id: productid })
    res.status(200).json({ status: true, message: "Get Data Successfully", data: product })
  } catch (e) {
    console.log("sssssssssssssssssssssssss:", e)
    res.status(500).json({ status: false, message: "Server Error" })

  }
  console.log(product)
});


router.put('/update_product',verifyTokenAndRole(['admin']), async function (req, res, next) {
  //   res.render('index', { title: 'Express' });
  try {
    const { productid } = req.body
    const updateData = req.body
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productid },          // Search condition
      { $set: updateData },      // Updated data
      { new: true }              // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "updated successfully",
      data: updatedProduct
    });

  } catch (e) {
    console.log("sssssssssssssssssssssssss:", e)
    res.status(500).json({ status: false, message: "Server Error" })

  }

});

router.delete('/delete_product',verifyTokenAndRole(['admin']), async function (req, res, next) {
  //   res.render('index', { title: 'Express' });
  try {
    const { productid } = req.body

    const deletedProduct = await Product.findOneAndDelete({ _id: productid });
    if (!deletedProduct) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Product deleted successfully",
      data: deletedProduct
    });

  } catch (e) {
    res.status(500).json({ status: false, message: "Server Error" })
  }
});

module.exports = router;
