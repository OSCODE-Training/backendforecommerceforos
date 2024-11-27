
const mongoose = require('mongoose')
var categorySchema = mongoose.Schema({
    categoryname:{"type":String,required:true},
    image:{"type":String,require},

},{ timestamps: true })
module.exports =mongoose.model("category",categorySchema)




