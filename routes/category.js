var express = require('express');
var router = express.Router();
var upload = require("../src/middlewares/multer.middleware");
const {verifyTokenAndRole}  = require("../src/middlewares/auth.middleware");
var Category = require("../src/models/category.model");
/* GET home page. */
router.post('/add_new_category',verifyTokenAndRole(['admin']), upload.single("image"), function (req, res, next) {
  //   res.render('index', { title: 'Express' });

  try {
    var { categoryname } = req.body
    var category = new Category({ "categoryname": categoryname, "image": req.file.filename })
    category.save().then((saveData) => {
      if (category == saveData) {
        // setTimeout(function(){
        //   res.status(200).json({ status: true, message: "Submitted Successfully" })
        // },2000)
        res.status(200).json({ status: true, message: "Submitted Successfully" })

      } else {
        res.status(200).json({ status: false, message: "Database Error" })
      }
    })
  } catch (e) {
    res.status(500).json({ status: false, message: "Server Error" })

  }
  
});


router.get('/get_all_category',verifyTokenAndRole(['admin','user']),async function(req, res, next) {
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


router.post('/get_specific_category',verifyTokenAndRole(['admin','user']), async function (req, res, next) {
  //   res.render('index', { title: 'Express' });
  try {
    var { categoryid } = req.body
    var category = await Category.findOne({ _id: categoryid })
    res.status(200).json({ status: true, message: "Get Data Successfully", data: category })
  } catch (e) {
    console.log("sssssssssssssssssssssssss:", e)
    res.status(500).json({ status: false, message: "Server Error" })

  }
  console.log(category)
});


router.put('/update_category',verifyTokenAndRole(['admin']), async function (req, res, next) {
  //   res.render('index', { title: 'Express' });
  try {
    const { categoryid } = req.body
    const updateData = req.body
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryid },          // Search condition
      { $set: updateData },      // Updated data
      { new: true }              // Return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: updatedCategory
    });

  } catch (e) {
    console.log("sssssssssssssssssssssssss:", e)
    res.status(500).json({ status: false, message: "Server Error" })

  }

});

router.delete('/delete_category',verifyTokenAndRole(['admin']), async function (req, res, next) {
  //   res.render('index', { title: 'Express' });
  try {
    const { categoryid } = req.body

    const deletedCategory = await Category.findOneAndDelete({ _id: categoryid });
    if (!deletedCategory) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Category deleted successfully",
      data: deletedCategory
    });

  } catch (e) {
    res.status(500).json({ status: false, message: "Server Error" })
  }
});

module.exports = router;
