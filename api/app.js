require('dotenv').config();
var express = require('express');
const moongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const MONGODB_URI = process.env.MONGODB_URI
const authRoutes = require('./routes/auth');
app.use(bodyParser.json({ limit: "50mb" }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/auth',authRoutes);
app.use((error,req,res,next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message || 'Server Error';
    const data = error.data;
    res.status(status).json({ message : message,data : data});  
  })

moongoose.connect(MONGODB_URI)
.then( result => {
  app.listen(5000,() => {
    console.log("server started");
})
})
.catch(err => {
    console.log(err)
})