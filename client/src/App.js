import React,{useState,useEffect,useCallback} from 'react';
import { withRouter } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage';
import SignInAndUp from './pages/signInandUp/signInandUp';

function App({history}) {
  const [user,Setuser] = useState({token:"",username:""});
  const [loading,Setloading] = useState(true);

  const logoutHandler = useCallback(() => {
    Setuser({token: null});
    localStorage.removeItem('ichatApptoken');
    localStorage.removeItem('ichatAppexpiryDate');
    localStorage.removeItem('ichatAppusername');
    history.push('/')
  },[history])

  useEffect(()=> {
    const token =     localStorage.getItem('ichatApptoken');
    const expiryDate = localStorage.getItem('ichatAppexpiryDate');
    Setloading(true);
    if (!token || !expiryDate) {
      Setloading(false);
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      Setloading(false);
      return;
    }
    const username = localStorage.getItem('ichatAppusername');
    Setuser({username : username,token : token}); 
    Setloading(false);
  },[logoutHandler])

  return (
    <div className="App">
    {loading ? 
      "Loading..."
      : ( user.token ? 
      (<HomePage user={user} Setuser={Setuser} />) : ( <SignInAndUp Setuser={Setuser}/>)
        )
    }
    </div>
  );
}

export default withRouter(App);