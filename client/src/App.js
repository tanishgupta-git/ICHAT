import React, { useEffect, useState } from 'react';
import HomePage from './pages/homePage/homePage';
import { Route, Switch,withRouter } from 'react-router-dom';
import ChatRoom from './pages/chatRoom/chatRoom';
import {useSocket } from './contexts/SocketProvider';

function App({history}) {
  const {socket} = useSocket();
  const [username,Setusername] = useState();
  useEffect(() => {

    if (socket) {
  
    socket.on('userEnterApproved',function(data){
      Setusername(data)
      history.push('/chat')
    }) 
  }
    
  },[socket,history])
  return (
    <div className="App" style={{ height:'100vh',boxSizing:'border-box'}}>
     <Switch>
     <Route exact path='/chat' render={(props) => (<ChatRoom {...props} socket={socket} username={username}/>)} />
     <Route path='/' render={(props) => ( <HomePage {...props} socket={socket} username={username}/>)}/>
     </Switch>
    </div>
  );
}

export default withRouter(App);