import React, { useState } from 'react';
import './signin.css';

const Signin = ({Setsignup,Setuser}) => {
    const [username,Setusername] = useState("");
    const [password,Setpassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/auth/login',{
            method:'POST',
            body : JSON.stringify({
                username : username,
                password : password
            }),
            headers : {
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then( resData => {
            console.log(resData);
            localStorage.setItem('ichatApptoken', resData.token);
            localStorage.setItem('ichatAppusername', resData.username);
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(
              new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem('ichatAppexpiryDate', expiryDate.toISOString());
            Setuser(resData)
        }).catch(err => {
            console.log(err);
        })
    }
    return (
       <div>
           Hello from signin
           <form onSubmit={handleSubmit}>
               <input type='text' value={username} onChange={(e) => Setusername(e.target.value)} placeholder='Username' />
               <input type='password' value={password} onChange={(e) => Setpassword(e.target.value)} placeholder='Password' />
               <input type='submit' />
           </form>
           <p>Don't Have an account <button onClick={() => Setsignup(true)}>Sign up!</button></p>
       </div>
   )
}

export default Signin;