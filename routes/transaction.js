var express = require('express');
var router = express.Router();
var Transaction = require("../src/models/transaction.model");
/* GET home page. */
router.post('/add_new_transaction', function(req, res, next) {
//   res.render('index', { title: 'Express' });
try{
var body = {...req.body}
var transaction = new Transaction(body)
transaction.save().then((saveData) => {
    if (transaction == saveData) {
      res.status(200).json({ status: true, message: "Submitted Successfully" })
    } else {
      res.status(200).json({ status: false, message: "Database Error" })
    }
  })
  }catch(e){
    res.status(500).json({ status: false, message: "Server Error" })

  }
console.log(transaction)
});


router.get('/get_all_transaction',async function(req, res, next) {
    //   res.render('index', { title: 'Express' });
    try{
    var transaction = await Transaction.find()  
    res.status(200).json({ status: true, message: "Get Data Successfully",data:transaction })
    }catch(e){
        console.log("sssssssssssssssssssssssss:",e)
        res.status(500).json({ status: false, message: "Server Error" })
        
      }
    console.log(transaction)
    });


    
     
     router.delete('/delete_transaction',async function(req, res, next) {
                //   res.render('index', { title: 'Express' });
                try{
                const {transactionid} = req.body
               
                const deletedTransaction = await Transaction.findOneAndDelete({ _id: transactionid });
        if (!deletedTransaction) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Transaction deleted successfully",
            data: deletedTransaction
        });
    
     }catch(e){
       res.status(500).json({ status: false, message: "Server Error" })
        }
     }); 

module.exports = router;
