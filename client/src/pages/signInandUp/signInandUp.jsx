import React,{useState} from 'react';
import './signInandUp.css';
import Signup from '../../components/signup/signup';
import Signin from '../../components/signin/signin';

const SignInAndUp = ({Setuser}) => {
    const [signup,Setsignup] = useState(false);
  return (
      <div>
          {
              signup ? 
              <Signup Setsignup={Setsignup} />
              : 
              <Signin Setuser={Setuser} Setsignup={Setsignup} />
          }
    
      </div>
  )
}

export default SignInAndUp;