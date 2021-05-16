import React from 'react';
import Navbar  from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand><Link to='/'> ICHAT</Link></Navbar.Brand>
     </Navbar>
  )
}

export default Header