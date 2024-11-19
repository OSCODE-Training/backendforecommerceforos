
const mongoose = require('mongoose')
var cartSchema = mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    orderid:{type:mongoose.Schema.Types.ObjectId,ref:"order",required:true},

},{ timestamps: true })
module.exports =mongoose.model("cart",cartSchema)




