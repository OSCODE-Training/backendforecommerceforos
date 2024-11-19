const mongoose = require('mongoose')
var userSchema = mongoose.Schema({
    username:{"type":String,require:true},
    password:{"type":String,required:true},
    emailid:{"type":String,required:true,unique:true},
    address:{"type":String,required:true},
    phoneno:{"type":Number,required:true,unique:true},
    picture:{"type":String,required:true},
    role:{"type":String,default:"user"}

},{ timestamps: true })
module.exports =mongoose.model("user",userSchema)
