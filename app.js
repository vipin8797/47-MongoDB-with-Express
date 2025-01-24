//Requiring dependencies
const express = require("express"); //express
const mongoose = require('mongoose'); //mongoose for MongoDB
const Chat = require('./models/chat'); //Our Chat model
const path = require('path');  //Path for ejs templates


//mongoose connection to DB
const DB = "whatsapp";
async function main(){
     await mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`)
    }
  



//Using dependencies    
const app = express(); //app for server
app.use(express.urlencoded({extended:true})); //Post requers parser
app.set('views engine','ejs'); //view engine for ejs.
app.set("views",path.join(__dirname,"views")); //default folder for ejs template views.
app.use(express.static(path.join(__dirname,"public"))); //default public folder for static fiels


//************************************Routes-Start */
app.get('/',(req,res)=>{
    res.send("Root Route is Working");
})

//index route
app.get('/index', async(req,res)=>{
       let chatsData =  await Chat.find();
       res.render('index.ejs',{chatsData});
    
})






//************************************Routes-End */
const port = 3000;
main().then(()=>{
    console.log(`connectd to: ${DB} DB`);
    app.listen(port,()=>{
        console.log(`listening at port ${port}`);
    })
})
