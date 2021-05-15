var express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000 || process.env.PORT;
app.use(bodyParser.json())


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use((error,req,res,next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message || 'Server Error';
    const data = error.data;
    res.status(status).json({ message : message,data : data});  
  })

const server = app.listen(PORT,() => {console.log("server started");})
const io = require('./socket').init(server);
io.on('connection',socket => {
  console.log("Client Connected");
});