require('dotenv').config();
var express = require('express');
const path = require('path');
const moongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const MONGODB_URI = process.env.MONGODB_URI
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
app.use(bodyParser.json())
app.use('/images/group',express.static(path.join(__dirname,'images/group')));
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
app.use('/chat',chatRoutes);
app.use((error,req,res,next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message || 'Server Error';
    const data = error.data;
    res.status(status).json({ message : message,data : data});  
  })

moongoose.connect(MONGODB_URI)
.then( result => {
  const server = app.listen(5000,() => {
    console.log("server started");
})
const io = require('./socket').init(server);
io.on('connection',socket => {
  console.log("Client Connected");
});
})
.catch(err => {
    console.log(err)
})