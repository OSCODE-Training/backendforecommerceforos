var express = require('express');
var router = express.Router();
var Transaction = require("../src/models/transaction.model");
var Userquery = require("../src/models/userquery.model");
/* GET home page. */
router.post('/add_user_query', function(req, res, next) {
//   res.render('index', { title: 'Express' });
try{
var body = {...req.body}
var userquery = new Userquery(body)
userquery.save().then((saveData) => {
    if (userquery == saveData) {
      res.status(200).json({ status: true, message: "Submitted Successfully" })
    } else {
      res.status(200).json({ status: false, message: "Database Error" })
    }
  })
  }catch(e){
    res.status(500).json({ status: false, message: "Server Error" })

  }
console.log(userquery)
});


router.get('/get_all_user_query',async function(req, res, next) {
    //   res.render('index', { title: 'Express' });
    try{
    var userquery = await Userquery.find()  
    res.status(200).json({ status: true, message: "Get Data Successfully",data:userquery })
    }catch(e){
        console.log("sssssssssssssssssssssssss:",e)
        res.status(500).json({ status: false, message: "Server Error" })
        
      }
    console.log(userquery)
    });

    router.post('/get_user_specific_query',async function(req, res, next) {
        //   res.render('index', { title: 'Express' });
        try{
        var {userid} = req.body
        var userquerydata = await Userquery.find({userid:userid})  
        res.status(200).json({ status: true, message: "Get Data Successfully",data:userquerydata })
        }catch(e){
            console.log("sssssssssssssssssssssssss:",e)
            res.status(500).json({ status: false, message: "Server Error" })
            
          }
        // console.log(product)
        });   


    
     
     router.delete('/delete_user_query',async function(req, res, next) {
                //   res.render('index', { title: 'Express' });
                try{
                const {queryid} = req.body
               
                const deletedQuery = await Userquery.findOneAndDelete({ _id: queryid });
        if (!deletedQuery) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Transaction deleted successfully",
            data: deletedQuery
        });
    
     }catch(e){
       res.status(500).json({ status: false, message: "Server Error" })
        }
     }); 

module.exports = router;
