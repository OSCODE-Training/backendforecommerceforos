var express = require('express');
var router = express.Router();
var jwt=require('jsonwebtoken');

var User = require("../src/models/user.model");
/* GET home page. */

router.post('/user_admin_login',async function(req, res, next) {
    //   res.render('index', { title: 'Express' });
    try{
    var {phoneno,emailid,password,role} = req.body
    var user = await User.findOne({phoneno:phoneno,emailid:emailid,password:password,role:role}) 
    

    if(user==null)
    {
        res.status(200).json({ status: true, message: "This User And Admin is not Registered..."})
    }
    else{
        console.log("99999999999999999999999999999999999999:",user)
        var token = jwt.sign({ data: user }, "shhhhhh",/*{ expiresIn: "60s" }*/);
        res.status(200).json({ status: true, message: "Login Successfully",data:user,token})
    }
    
    }catch(e){
        console.log("sssssssssssssssssssssssss:",e)
        res.status(500).json({ status: false, message: "Server Error" })
        
      }
    
    }); 



module.exports = router;
