import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Header from '../../components/header/header';
import CreateGroup from '../creategroup/creategroup';
import ExploreGroups from '../exploregroups/exploregroups';
import UserChats from '../userchats/userchats';
import './homepage.css';

const HomePage = ({user,Setuser}) => {
 
    return (
      <div>
       <Header Setuser={Setuser}/>
       <Switch>
          <Route exact path='/create-group' render={(props) => (<CreateGroup {...props} user={user} /> )} />
          <Route exact path='/explore-groups' render={ (props) => (<ExploreGroups {...props} user={user} />)} /> 
          <Route path='/'  render={(props) => (<UserChats {...props} user={user} />) } />
      </Switch>
      </div>
    )
}

export default HomePage;