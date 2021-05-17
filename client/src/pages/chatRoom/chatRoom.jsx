import React,{useEffect, useState} from 'react';

const ChatRoom = ({history,socket,username}) => {
    const [message,Setmessage] = useState("");
    const [allChats,Setallchats] = useState([]);
    const [users,Setusers] = useState([]);
    useEffect(() => {
     if (socket) {
      if(!username) {
        history.push('/')
        return;
      }
      socket.on('newmessage',function(data){
        Setallchats(prevchats => ([...prevchats,data]))
      })
      socket.on('users',function(data){
        Setusers(data);
      })
    }
    },[socket,username,history])
    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('addchat',{message:message});
        Setmessage("")
    }
    return (
        <div className='row'>
            <div className='col-3 bg-dark h-100'>
              <p className='text-light'>Users in the list</p>
               {
                 users.map( user => (
                   <div key={Math.random()}>
                    {user}
                   </div>
                 ))
               }
            </div>
            <div className='col-9'>
            {
                allChats.map( chat => <div key={Math.random()}>
                <p>{chat.user}</p>
                <p>{chat.message}</p>
                </div>)
            }
              <form onSubmit={handleSubmit}>
                  <input type='text' value={message} onChange={(e) => Setmessage(e.target.value)}/>
                  <input type='submit' />
              </form>
            </div>
        </div>
    )
}

export default ChatRoom;