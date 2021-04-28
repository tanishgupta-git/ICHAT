import React from 'react';
import './header.css';
import { withRouter} from 'react-router-dom';

const Header = ({Setuser,history}) => {
   const logoutHandler = () => {
    Setuser({token: null});
    localStorage.removeItem('ichatApptoken');
    localStorage.removeItem('ichatAppexpiryDate');
    localStorage.removeItem('ichatAppuserId');
    history.push('/')
   }
    return (
        <div className="header">
          <h1>ICHAT</h1>
          <span>
            <button onClick={logoutHandler}>Logout</button>
          </span>
        </div>
    )
}

export default withRouter(Header);