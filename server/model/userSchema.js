const mongoose = require("mongoose");
// const { trim } = require("validator");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim: true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }

})

const userdb = new mongoose.model("assignusers", userSchema);
module.exports = userdb;