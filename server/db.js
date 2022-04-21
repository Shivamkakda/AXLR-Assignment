const mongoose = require("mongoose");

module.exports = async()=>{
    try{
        const connectParam = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        await mongoose.connect("mongodb://localhost/todo-app",
        connectParam
        );
        console.log("connection succesfull")
    }catch(err){
        console.log(err)
    }
}