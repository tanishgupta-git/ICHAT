import React, { useState } from 'react';
import Signin from '../../components/signin/signin';
import Signup from '../../components/signup/signup';
import './homepage.css';

const HomePage = ({Setuser}) => {
    const [signup,Setsignup] = useState(false);
    return (
      <div>
          Hello from homepage
          {
              signup ? 
              <Signup Setsignup={Setsignup} />
              : 
              <Signin Setuser={Setuser} Setsignup={Setsignup} />
          }
    
      </div>
    )
}

export default HomePage;