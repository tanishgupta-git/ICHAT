import React,{useState,useEffect} from 'react';
import './joinedgroup.css';

const JoinedGroup = ({user}) => {
    const [groups,Setgroups] = useState([]);
    useEffect(() => {
      fetch('http://localhost:5000/chat/getJoinedgroups',{
        method : 'GET',
        headers : 
        {
            Authorization : 'Bearer ' + user.token         
          } 
      })
      .then( res => {
          return res.json()
      }).then( resData => {
         Setgroups(resData.chats);
      }).catch( err => {
          console.log(err);
      })
    },[user.token])
    return (
        <div>
            {
                groups.map(group => <span key={group._id} >{group.name}</span> )
            }
        </div>
    )
}

export default JoinedGroup;