var express = require('express');
var router = express.Router();
var upload = require("./multer");
var User = require("../src/models/user.model");
/* GET home page. */


// router.post('/create_user', upload.single("picture"), function (req, res, next) {
//   //   res.render('index', { title: 'Express' });
//   console.log("Ssssssssssssssssssssssssss:", req.body)
//   try {
//     var body = { ...req.body, "picture": req.file.filename }
//     var user = new User(body)
//     user.save().then((saveData) => {
//       if (user == saveData) {
//         res.status(200).json({ status: true, message: "Submitted Successfully" })
//       } else {
//         res.status(400).json({ status: false, message: "Database Error" })
//       }
//     })
//   } catch (e) {
    
//     res.status(500).json({ status: false, message: "Server Error" })

//   }
  
// });

router.post('/create_user', upload.single("picture"), async function (req, res, next) {
  console.log("Request Body:", req.body);

  try {
    // Create user data with uploaded picture
    const body = { ...req.body, picture: req.file.filename };
    const user = new User(body);

    // Save the user data to MongoDB
    await user.save();
    res.status(200).json({ status: true, message: "User created successfully." });

  } catch (error) {
    // Check if the error is a MongoDB Duplicate Key Error
    if (error.code === 11000 && error.keyValue?.emailid) {
      console.error("Duplicate Key Error:", error);
      return res.status(400).json({
        status: false,
        message: `Duplicate Entry: The email '${error.keyValue?.emailid}' already exists.`,
      });
    }

    // Handle other MongoDB or server-side errors
    console.error("Error Occurred:", error);
    res.status(500).json({
      status: false,
      message: "An unexpected error occurred.",
      error: error.message,
    });
  }
});






router.get('/get_all_user', async function (req, res, next) {
  //   res.render('index', { title: 'Express' });
  try {
    var user = await User.find()
    res.status(200).json({ status: true, message: "Get Data Successfully", data: user })
  } catch (e) {
    console.log("sssssssssssssssssssssssss:", e)
    res.status(500).json({ status: false, message: "Server Error" })

  }
  console.log(user)
});


router.post('/get_specific_user', async function (req, res, next) {
  //   res.render('index', { title: 'Express' });
  try {
    var { userid } = req.body
    var user = await User.findOne({ _id: userid })
    res.status(200).json({ status: true, message: "Get Data Successfully", data: user })
  } catch (e) {
    console.log("sssssssssssssssssssssssss:", e)
    res.status(500).json({ status: false, message: "Server Error" })

  }
  console.log(user)
});


router.put('/update_user', async function (req, res, next) {
  //   res.render('index', { title: 'Express' });
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

router.delete('/delete_user', async function (req, res, next) {
  //   res.render('index', { title: 'Express' });

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
