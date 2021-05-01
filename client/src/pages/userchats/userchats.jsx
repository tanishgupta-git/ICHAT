import React,{useState} from 'react';
import GroupChat from '../../components/groupchat/groupchat';
import JoinedGroup from '../../components/joinedgroup/joinedgroup';
import './userchats.css'

const UserChats = ({user}) => {
    const [chatId,SetchatId] = useState("");
    return (
        <div className="userChats" >
           <JoinedGroup user={user} SetchatId={SetchatId}/>
           <GroupChat chatId={chatId} user={user}/>
        </div>
    )
}

export default UserChats;