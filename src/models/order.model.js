
const mongoose = require('mongoose')
var orderSchema = mongoose.Schema({
    categoryid:{type:mongoose.Schema.Types.ObjectId,ref:"category",required:true},
    productid:{type:mongoose.Schema.Types.ObjectId,ref:"product",required:true},
    transactionid:{type:mongoose.Schema.Types.ObjectId,ref:"transaction"},
    quantity:{"type":Number,require:true},
    

},{ timestamps: true })
module.exports =mongoose.model("order",orderSchema)




