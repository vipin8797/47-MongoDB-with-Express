//Requiring dependencies
const express = require("express"); //express
const mongoose = require('mongoose'); //mongoose for MongoDB
const Chat = require('/models/chat');


//mongoose connection to DB
const DB = "whatsapp";
async function main(){
     await mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`)
    }
  



//Using dependencies    
const app = express(); //app for server




//************************************Routes-Start */
app.get('/',(req,res)=>{
    res.send("Root Route is Working");
})






//************************************Routes-End */
const port = 3000;
main().then(()=>{
    console.log(`connectd to: ${DB} DB`);
    app.listen(port,()=>{
        console.log(`listening at port ${port}`);
    })
})
