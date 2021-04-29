import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../../components/header/header';
import CreateGroup from '../creategroup/creategroup';
import UserChats from '../userchats/userchats';
import './homepage.css';

const HomePage = ({user,Setuser}) => {
 
    return (
      <div>
       <Header Setuser={Setuser}/>
       <Route exact path='/create-group' render={(props) => (<CreateGroup {...props} user={user} /> )} /> 
       <Route path='/'  render={(props) => (<UserChats {...props} user={user} />) } />
      </div>
    )
}

export default HomePage;