import React from 'react';
import './header.css';
import { Link, withRouter} from 'react-router-dom';

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
          <Link to='/'><h1 className='header__logo'>ICHAT</h1></Link>
          <div>
            <Link to='/create-group' className='header__listitem'>Create Group</Link>
            <Link to='/explore-groups' className="header__listitem">Explore Groups</Link>
            <button onClick={logoutHandler} className='header__listitem'>Logout</button>
          </div>
        </div>
    )
}

export default withRouter(Header);