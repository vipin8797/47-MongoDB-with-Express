//Requiring dependencies
const mongoose = require('mongoose'); //mongoose for MongoDB



//chat Schema
const chatSchema = new mongoose.Schema({
 
})

//chat model
const Chat = mongoose.model("Chat",chatSchema);
module.exports = Chat;
