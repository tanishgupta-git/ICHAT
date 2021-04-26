import React,{useState,useEffect,useCallback} from 'react';
import { withRouter } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage';

function App({history}) {
  const [user,Setuser] = useState({token:"",userId:""});
  const [loading,Setloading] = useState(true);

  const logoutHandler = useCallback(() => {
    Setuser({token: null});
    localStorage.removeItem('ichatApptoken');
    localStorage.removeItem('ichatAppexpiryDate');
    localStorage.removeItem('ichatAppuserId');
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
    const userId = localStorage.getItem('ichatAppuserId');
    Setuser({userId : userId,token : token}); 
    Setloading(false);
  },[logoutHandler])

  return (
    <div className="App">
    {loading ? 
      "Loading..."
      : <HomePage Setuser={Setuser}/>
    }

    { user.token && <button onClick={logoutHandler}>Logout</button>}
    </div>
  );
}

export default withRouter(App);