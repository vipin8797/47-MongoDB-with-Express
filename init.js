
//Requiring Dependencies.
const mongoose = require('mongoose'); //mongoose for MongoDB
const Chat = require('./models/chat'); // Chat modle



//mongoose connection to DB
const DB = "whatsapp";
async function main(){
     await mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`)
    }
  



//removing previous data from database
async function dataInit(){
    try{
    await Chat.deleteMany({}); //delete all data.
    await Chat.insertMany(sampleData); //saving data.
    }catch(err){
      console.log(err);
    }
}
     
main().then((res)=>{
    dataInit();
   console.log(" all data deleted");
   console.log("Sample data initialized.");
  
}).catch((err)=>{
    console.log(err);
})  










//sample data

const sampleData = [
    {
      from: "vipin",
      to: "suresh",
      msg: "send me nudes.",
      created_At: new Date(),
    },
    {
      from: "suresh",
      to: "vipin",
      msg: "no way!",
      created_At: new Date(),
    },
      {
      from: "vipin",
      to: "suresh",
      msg: "please",
      created_At: new Date(),
    },
    {
      from: "alice",
      to: "bob",
      msg: "Hey, how's it going?",
      created_At: new Date("2024-07-26T10:00:00Z"), // Example with a specific date
    },
    {
      from: "bob",
      to: "alice",
      msg: "Pretty good, just working. You?",
      created_At: new Date("2024-07-26T10:05:00Z"),
    },
    {
      from: "charlie",
      to: "david",
      msg: "Did you finish the report?",
      created_At: new Date("2024-07-25T14:30:00Z"),
    },
    {
      from: "david",
      to: "charlie",
      msg: "Almost, just need to add a few more details.",
      created_At: new Date("2024-07-25T14:45:00Z"),
    },
      {
      from: "eve",
      to: "frank",
      msg: "Lunch later?",
      created_At: new Date(),
    },
      {
      from: "frank",
      to: "eve",
      msg: "Sounds good!",
      created_At: new Date(),
    },
    {
      from: "grace",
      to: "hector",
      msg: "Reminder: Meeting at 3pm.",
      created_At: new Date(),
    },
    {
      from: "hector",
      to: "grace",
      msg: "Got it, thanks!",
      created_At: new Date(),
    }
  ];
  