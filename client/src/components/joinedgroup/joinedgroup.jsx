import React,{useState,useEffect} from 'react';
import './joinedgroup.css';

const JoinedGroup = ({user,SetchatId}) => {
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
                groups.map(group => <div key={group._id} onClick={ () => SetchatId(group._id)} >{group.name}</div> )
            }
        </div>
    )
}

export default JoinedGroup;