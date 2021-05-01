import React,{useEffect,useState} from 'react';
import './groupchat.css';

const GroupChat = ({chatId,user}) => {
    const [message,Setmessage] = useState("")
    useEffect(() => {
  
    },[])
   const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/chat/add-message/${chatId}`,{
        method: 'POST',
        body : JSON.stringify({
            message : message
        }),
        headers : 
        {
            Authorization : 'Bearer ' + user.token,
            'Content-Type':'application/json'         
          }
    }).then( res => {
        return res.json()
    }).then(resData => {
        console.log(resData);
        Setmessage("");
    }).catch( err =>{
        console.log(err);
    })
   } 
    return (
        <div className='groupchat'>
        {chatId ? 
          <div>
          <form onSubmit={handleSubmit}>
              <input type="text" value={message} onChange={ (e) => Setmessage(e.target.value)} required />
              <input type='submit' value="Send" />
          </form>
          </div>
          :
          <p>Hello from groupchat</p>
        }
        </div>
    )
}

export default GroupChat;