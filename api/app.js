var express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT;
const server = app.listen(PORT,() => {console.log("server started");})
const io = require('./socket').init(server);
const users = [];

io.on('connection',socket => {

  socket.on('userEnterRoom',function(data){
    
    // checking that user already exists or not
    if(users.indexOf(data.username) !== -1) {
      socket.emit('userEnterdenied',{message:"This username is already taken"});
    }else{
      socket.username = data.username;
      users.push(data.username);
      socket.emit('userEnterApproved',socket.username)
      updateUsers();
      console.log(socket.id);
    }
  })

  function updateUsers() {
    io.emit('users',users)
  }
  socket.on('addchat',function(data) {
    console.log(data.message,socket.username);
    console.log(socket.id);
    io.emit('newmessage',{ 'message':data.message,'user':socket.username});
  })
  socket.on('disconnect',function(){

    users.splice(users.indexOf(socket.username),1);
    updateUsers();
  })
});