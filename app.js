// Basic Lib Import
const express = require('express');
const app = express();
const router =require('./src/routes/api');
const dotenv = require('dotenv');
dotenv.config();

// const bodyParser =require('body-parser');

// Security Middleware Lib Import
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');

// Database Lib Import
const mongoose =require('mongoose');

// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
    limit: '50mb',
    extended: true
}));

// Request Rate Limit
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

const mongoAtlasUri = `mongodb+srv://${process.env.DBUser}:${process.env.DBPass}@cluster0.d39q9wo.mongodb.net/${process.env.DBName}`

try {
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true,autoIndex:true,forceServerObjectId: true},
      () => console.log(" Mongoose is connected...")
    );

} catch (e) {
    console.log("could not connect");
}



// Routing Implement
app.use("/api/v1",router)

// Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Url Not Found"})
})


module.exports=app;
















