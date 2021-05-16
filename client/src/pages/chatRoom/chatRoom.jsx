import React,{useEffect, useState} from 'react';

const ChatRoom = ({socket}) => {
    const [message,Setmessage] = useState("");
    const [allChats,Setallchats] = useState([]);
    useEffect(() => {
     if (socket) {
      socket.on('newmessage',function(data){
        Setallchats(prevchats => ([...prevchats,data]))
      })
    }
    },[socket])
    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('addchat',{message:message});
        Setmessage("")
    }
    return (
        <div className='row'>
            <div className='col-3'>
              <h1>Users in the list</h1>
               
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