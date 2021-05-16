import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import HomePage from './pages/homePage/homePage';
import { Route, Switch,withRouter } from 'react-router-dom';
import ChatRoom from './pages/chatRoom/chatRoom';
import './App.css';
import {useSocket } from './contexts/SocketProvider';

function App({history}) {
  const socket = useSocket();
  useEffect(() => {

    if (socket) {
  
    socket.on('userEnterApproved',function(data){
      history.push('/chat')
    }) 
  }
    
  },[socket,history])
  return (
    <div className="App">
     <Header />
     <Switch>
     <Route exact path='/chat' render={(props) => (<ChatRoom {...props} socket={socket} />)} />
     <Route path='/' render={(props) => ( <HomePage {...props} socket={socket} />)}/>
     </Switch>
    </div>
  );
}

export default withRouter(App);