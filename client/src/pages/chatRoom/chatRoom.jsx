import React,{useEffect, useRef, useState} from 'react';
import './chatRoom.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useSocket } from '../../contexts/SocketProvider';

const ChatRoom = ({history,socket,username}) => {
    const [message,Setmessage] = useState("");
    const [allChats,Setallchats] = useState([]);
    const [users,Setusers] = useState([]);
    const { SetleaveRoom } = useSocket();
    const endOfMessagesRef = useRef(null);
    useEffect(() => {
     if (socket) {
      if(!username) {
        history.push('/')
        return;
      }
      socket.on('newmessage',function(data){
        Setallchats(prevchats => ([...prevchats,data]))
        endOfMessagesRef.current.scrollIntoView({
          behavior : "smooth",
          block : "start",
       })
      })
      socket.on('users',function(data){
        Setusers(data);
      })
      socket.on('userdisconnect',function(data){
        SetleaveRoom(true);
        history.push('/');
        return;
      })
    }
    },[socket,username,history,SetleaveRoom])
    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('addchat',{message:message});
        Setmessage("")
    }
    const leaveRoom = () => {
      socket.emit('leaveRoom',{"message":'leave'});
    }
    return (
    <div className='container-fluid h-100'>
        <div className='row h-100'>
            <div className='chatRoom-users col-3 bg-dark h-100'>
            <h2 className='text-white'>ICHAT</h2>
            <button className='btn btn-secondary' onClick={leaveRoom}>Leave Room</button>
              <h5 className='text-white my-3' style={{fontWeight:'normal'}}>Users in the list</h5>
               {
                 users.map( user => (
                   <p className='text-light' key={Math.random()}>{user}</p>
                 ))
               }
            </div>
            <div className='chatContainer col-9'>
            <div className='chats'>
            {
                allChats.map( chat => 
            
              ( chat.user === username ? (
                <div className='chatMessage chatMessageSelf' key={Math.random()}>
                  <p>{chat.message}</p>
                </div>
                )
              : (
                <div className='chatMessage chatMessageOther' key={Math.random()}>
                  <h6>{chat.user}</h6>
                  <p>{chat.message}</p>
                </div>
                
                )
              )
      )

            }
            <div className='endofchats' ref={endOfMessagesRef}></div>
            </div>
              <form className='chatRoom-form' onSubmit={handleSubmit}>
              <div className='chatRoom-forminput'>
                  <InputGroup>
                  <FormControl
                    placeholder="Enter Message"
                    aria-label="Enter Message"
                    aria-describedby="basic-addon2"
                    value={message} 
                    onChange={(e) => Setmessage(e.target.value)}
                    required
                  />
                  <InputGroup.Append>
                    <Button 
                    type='submit' 
                    variant="dark">Send</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
              </form>
            </div>
        </div>
        </div>
    )
}

export default ChatRoom;