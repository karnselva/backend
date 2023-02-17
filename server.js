require("dotenv").config()
const express=require("express")
const app=express()
const cors=require("cors")

const mongoose=require("mongoose")

//const PORT=process.env.PORT || 5000
const PORT= 5000

const uri = process.env.MONGODB_URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;



//connectdb()
app.use(cors())
app.use(express.json())

console.log(process.env.MONGODB_URI,"uri")
app.use("/api/user",require("./route/user"))
app.use("/api/refresh",require("./route/refreshroute"))
//app.use(verifyJwt)
app.use("/api/note",require("./route/note"))

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB successfully using Mongoose!");
  app.listen(PORT,()=>{console.log(`server starts at port ${PORT}`)})
});







 





 

