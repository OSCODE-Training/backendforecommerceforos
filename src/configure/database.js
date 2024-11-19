const mongoose =require("mongoose");
var pool =()=>{
    mongoose.Promise = global.Promise;

    var options={}

    mongoose.connect(`mongodb://localhost:27017/ecommerceforos?retryWrites=true&w=majority`,options);

    mongoose.connection.once("open",()=>console.log("mongodb running")).on("error",(err)=>console.log(err));

};

module.exports=pool;