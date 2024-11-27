var express = require('express');
var router = express.Router();
var jwt=require('jsonwebtoken');
var User = require("../src/models/user.model");



/* GET home page. */



router.post('/user', function(req, res, next) {
    //   res.render('index', { title: 'Express' });
    try {
        const {username} = req.body;
        if(!username?.trim())
        {
            throw new ApiError(400,"username is missing")
        }
    } catch (error) {
        throw new ApiError(400,"Server Error")
    }
    }); 


    
router.get('/get_users', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Default page is 1
      const limit = parseInt(req.query.limit) || 8; // Default limit is 8 records per page
      const skip = (page - 1) * limit; // Skip previous pages data
  
      // Get paginated data from MongoDB
      const users = await User.find()
        .skip(skip) // Skip previous pages
        .limit(limit); // Limit the number of records per page
  
      // Get total count of records
      const totalRecords = await User.countDocuments();
  
      // Send paginated response
      res.status(200).json({
        status: true,
        data: users,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: page,
      });
  
    } catch (error) {
      console.error("Error in getting users:", error);
      res.status(500).json({ status: false, message: "Server Error", error: error.message });
    }
  });
  



module.exports = router;
