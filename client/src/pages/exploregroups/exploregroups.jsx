import React,{useEffect,useState} from 'react';
import ExploreGroup from '../../components/exploregroup/exploregroup';
import './exploregroups.css';

const ExploreGroups = ({user}) => {
    const [groups,Setgroups] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/chat/getExploregroups',{
          method : 'GET',
          headers : 
          {
              Authorization : 'Bearer ' + user.token         
            } 
        })
        .then( res => {
            return res.json()
        }).then( resData => {
           Setgroups(resData.groups);
        }).catch( err => {
            console.log(err);
        })
      },[user.token])
    return (
        <div className='exploreGroups'>
           <h1>Explore New Groups</h1>
           {
               groups.map( group => (
                 <ExploreGroup key={group._id} group={group} user={user} />
               ))
           }
        </div>
    )
}

export default ExploreGroups;