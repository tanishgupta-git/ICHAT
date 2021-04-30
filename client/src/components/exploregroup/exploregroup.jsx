import React from 'react';
import './exploregroup.css';
import { withRouter} from 'react-router-dom';

const ExploreGroup = ({group,user,history}) => {
   const handleClick = () => {
    fetch(`http://localhost:5000/chat/joingroup/${group._id}`,{
        method : 'POST',
        headers : 
        {
            Authorization : 'Bearer ' + user.token         
          } 
      })
      .then( res => {
          return res.json()
      }).then( resData => {
        history.push('/')
      }).catch( err => {
          console.log(err);
      })
   }
    return (
    <div>
    <span>{group.name}</span>
    <button onClick={handleClick}>Join Group</button>
    </div>
   ) 
}

export default  withRouter(ExploreGroup);