//Requiring dependencies
const mongoose = require('mongoose'); //mongoose for MongoDB



//chat Schema
const chatSchema = new mongoose.Schema({
  from:{
     type:String,
     required:true,
  },
  to:{
     type:String,
     required:true,
  },
  msg:{
    type:String,
    maxLength:50,
  },
  created_At:{
   type:Date,
   required:true,
  }
});

//chat model
const Chat = mongoose.model("Chat",chatSchema);
module.exports = Chat;
