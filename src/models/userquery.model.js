
const mongoose = require('mongoose')
var userquerySchema = mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    subject:{"type":String,require:true},
    message:{"type":String,require:true},
    

},{ timestamps: true })
module.exports =mongoose.model("userquery",userquerySchema)




