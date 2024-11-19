
const mongoose = require('mongoose')
var transactionSchema = mongoose.Schema({
    transactiondetails:{"type":String}
},{ timestamps: true })
module.exports =mongoose.model("transaction",transactionSchema)




