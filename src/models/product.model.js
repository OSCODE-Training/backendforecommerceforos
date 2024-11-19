
const mongoose = require('mongoose')
var productSchema = mongoose.Schema({
    categoryid:{type:mongoose.Schema.Types.ObjectId,ref:"category",required:true},
    productname:{"type":String,require:true},
    description:{"type":String,require:true},
    price:{"type":Number,require:true},
    image:{"type":String,require},

},{ timestamps: true })
module.exports =mongoose.model("product",productSchema)




