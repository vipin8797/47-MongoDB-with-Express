//Requiring dependencies
const express = require("express"); //express
const mongoose = require('mongoose'); //mongoose for MongoDB
const Chat = require('./models/chat'); //Our Chat model
const path = require('path');  //Path for ejs templates
const methodOverride = require('method-override'); //method override fot put,patch,delete req
const ExpressError = require('./ExpressError'); //custom ExpressError class
const asyncWrap = require("./asyncWrap"); //to handle asynchronous error.

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
app.use(methodOverride('_method')); //method overide

//************************************Routes-Start */
app.get('/',(req,res)=>{
    res.send("Root Route is Working");
})

//index route
app.get('/index', asyncWrap(async(req,res)=>{
       let chatsData =  await Chat.find();
       res.render('index.ejs',{chatsData});
    
}));

//new chat
app.get('/chat/new',(req,res)=>{
    res.render('new.ejs');
});
  

app.post('/chats', asyncWrap(async (req, res, next) => {

    const { from, msg, to } = req.body;
    let newChat = new Chat({
        to: to,
        from: from,
        msg: msg,
        created_At: new Date()
    });
    const saved = await newChat.save();
    if(!saved){
        next(new ExpressError(404,'chat not saved in DB'));
    }else{
    res.redirect('/index');
    }

}));


//Edit route
app.get('/chats/:id/edit', asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    let chatData = await Chat.findById(id);
    if (!chatData) {
        next(new ExpressError(400, 'chatData is not found to edit'));
    } else {
        res.render('edit.ejs', { chatData });
    }
}));
    
    
  
    
app.put('/chats/:id/edit', asyncWrap(async (req, res, next) => {

    const { id } = req.params;
    const { msg } = req.body;
    let updated = await Chat.findByIdAndUpdate(id, { msg: msg }, { runValidators: true });
    if (!updated) {
        next(new ExpressError(404, "Chat not found to edit"));
    } else {
        res.redirect('/index');
    }


}));


//Delet route
app.delete("/delete/:id", asyncWrap(async (req, res, next) => {

    const { id } = req.params;
    const deletedChat = await Chat.findByIdAndDelete(id);
    if (!deletedChat) {
        next(new ExpressError(404, "delete operation failed."));
    }
    res.redirect('/index');

}));
    


//Error Handling Middleware
app.use((err,req,res,next)=>{
    const{status=500,message='something eror happen'} = err;
    res.status(status).send(message);
})



//************************************Routes-End */
const port = 3000;
main().then(()=>{
    console.log(`connectd to: ${DB} DB`);
    app.listen(port,()=>{
        console.log(`listening at port ${port}`);
    })
})
