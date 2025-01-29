//Requiring dependencies
const express = require("express"); //express
const mongoose = require('mongoose'); //mongoose for MongoDB
const Chat = require('./models/chat'); //Our Chat model
const path = require('path');  //Path for ejs templates
const methodOverride = require('method-override'); //method override fot put,patch,delete req
const ExpressError = require('./ExpressError');

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
app.get('/index', async(req,res)=>{
       let chatsData =  await Chat.find();
       res.render('index.ejs',{chatsData});
    
})

//new chat
app.get('/chat/new',(req,res)=>{
    res.render('new.ejs');
});
  

app.post('/chats',async(req,res,next)=>{
    try{
        const {from,msg,to} = req.body;
        let newChat = new Chat({
        to:to,
        from:from,
        msg:msg,
        created_At:new Date()
    });
    await newChat.save();
    res.redirect('/index');
  } catch (error) {
        next(error);
    }
})


//Edit route
app.get('/chats/:id/edit',async(req,res,next)=>{
    try{
    const {id} = req.params;
    let chatData = await Chat.findById(id);
    res.render('edit.ejs',{chatData});
    }catch(err){
        next(err);
    }
  
});
    
app.put('/chats/:id/edit',async(req,res,next)=>{
    try{
        const { id } = req.params;
        const {msg} = req.body;
    let updated = await Chat.findByIdAndUpdate(id,{msg:msg},{runValidators:true});
    console.log(updated);
    res.redirect('/index');
    }catch (error) {
        next(error);
    }

});


//Delet route
app.delete("/delete/:id",async(req,res,next)=>{
    try{
        const{id} = req.params;
    await Chat.findByIdAndDelete(id);

    res.redirect('/index');
    }catch (error) {
       next(err);  
    }
});
    


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
