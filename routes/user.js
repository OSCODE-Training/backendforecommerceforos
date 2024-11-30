var express = require('express');
var router = express.Router();
var upload = require("../src/middlewares/multer.middleware");
const {verifyTokenAndRole}  = require("../src/middlewares/auth.middleware");
var User = require("../src/models/user.model");
/* GET home page. */


// router.post('/create_user', upload.single("picture"),async function (req, res, next) {
//   //   res.render('index', { title: 'Express' });
//   console.log("Ssssssssssssssssssssssssss:", req.body)
//   try {
//     var body = { ...req.body, "picture": req.file.filename }
//     var user = new User(body)
//     user.save().then((saveData) => {
//       if (user == saveData) {
//        return res.status(200).json({ status: true, message: "Submitted Successfully" })
//       } else {
//        return res.status(400).json({ status: false, message: "Database Error" })
//       }
//     })
//   } catch (e) {

//    return res.status(500).json({ status: false, message: "Server Error" })

//   }

// });

// router.post('/create_user', upload.single("picture"), async function (req, res, next) {
//   console.log("Request Body:", req.body);

//   try {

//     const body = { ...req.body, picture: req.file.filename };
//     const user = new User(body);


//     await user.save();
//     res.status(200).json({ status: true, message: "User created successfully." });

//   } catch (error) {
//     if (error.code === 11000 && error.keyValue?.emailid) {
//       console.error("Duplicate Key Error:", error);
//       return res.status(400).json({
//         status: false,
//         message: `Duplicate Entry: The email '${error.keyValue?.emailid}' already exists.`,
//       });
//     }

//     if(error.keyValue?.phoneno){
//       return res.status(400).json({
//         status: false,
//         message: `Duplicate Entry: The Phoneno '${error.keyValue?.phoneno}' already exists.`,
//       });
//     }

//     console.error("Error Occurred:", error);
//     res.status(500).json({
//       status: false,
//       message: "An unexpected error occurred.",
//       error: error.message,
//     });
//   }
// });

router.post('/create_user',verifyTokenAndRole(['admin']), upload.single("picture"), async function (req, res, next) {
  //   res.render('index', { title: 'Express' });
  var { emailid, phoneno } = { ...req.body }
  // console.log("tttttttttttttttttt:", emailid + " " + phoneno)
  try {
    const status = await User.findOne({ "emailid": emailid })
    if (status) {
      return res.status(409).json({ status: false, message: `This ${emailid} Email is already Exists .` })

    }
    const statusphoneno = await User.findOne({ "phoneno": phoneno })
    if (statusphoneno) {
      return res.status(409).json({ status: false, message: `This ${phoneno} Email is already Exists .` })

    }
    var body = { ...req.body, "picture": req.file.filename }
    var user = new User(body)
    await user.save().then((saveData) => {
      if (user == saveData) {
        return res.status(200).json({ status: true, message: "Submitted Successfully" })
      } else {
        return res.status(400).json({ status: false, message: "Database Error" })
      }
    })
  } catch (e) {
    return res.status(500).json({ status: false, message: "Server Error" })
  }

});




router.get('/get_all_user',verifyTokenAndRole(['admin']), async function (req, res, next) {
  try {
    var user = await User.find()
    res.status(200).json({ status: true, message: "Get Data Successfully", data: user })
  } catch (e) {
    console.log("sssssssssssssssssssssssss:", e)
    res.status(500).json({ status: false, message: "Server Error" })

  }
  console.log(user)
});


router.post('/get_specific_user',verifyTokenAndRole(['admin']), async function (req, res, next) {
  //   res.render('index', { title: 'Express' });
  try {
    var { userid } = req.body
    var user = await User.findOne({ _id: userid })
    res.status(200).json({ status: true, message: "Get Data Successfully", data: user })
  } catch (e) {
    res.status(500).json({ status: false, message: "Server Error" })
  }
  console.log(user)
});


router.put('/update_user',verifyTokenAndRole(['admin']), async function (req, res, next) {
  try {
    const { userid } = req.body
    const updateData = req.body
    const updatedUser = await User.findOneAndUpdate(
      { _id: userid },          // Search condition
      { $set: updateData },      // Updated data
      { new: true }              // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: updatedUser
    });

  } catch (e) {
    console.log("sssssssssssssssssssssssss:", e)
    res.status(500).json({ status: false, message: "Server Error" })

  }

});

router.delete('/delete_user',verifyTokenAndRole(['admin']), async function (req, res, next) {
  try {
    const { userid } = req.body

    const deletedUser = await User.findOneAndDelete({ _id: userid });

    if (!deletedUser) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "User deleted successfully",
      data: deletedUser
    });

  } catch (e) {
    res.status(500).json({ status: false, message: "Server Error" })
  }
});

module.exports = router;
