import React from 'react';
import GroupChat from '../../components/groupchat/groupchat';
import JoinedGroup from '../../components/joinedgroup/joinedgroup';
import './userchats.css'

const UserChats = ({user}) => {
    return (
        <div>
           <JoinedGroup user={user}/>
           <GroupChat />
        </div>
    )
}

export default UserChats;