import React,{useState} from 'react';
import './signup.css';

const Signup = ({Setsignup}) => {
    const [username,Setusername] = useState("");
    const [email,Setemail] = useState("");
    const [password,Setpassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/auth/signup',{
            method:'PUT',
            body : JSON.stringify({
                username : username,
                email : email,
                password : password
            }),
            headers : {
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then( resData => {
            console.log(resData);
        })
    }
    return (
       <div>
           Hello from signup
           <form onSubmit={handleSubmit}>
               <input type='text' value={username} onChange={(e) => Setusername(e.target.value)} placeholder='Username' />
               <input type='email' value={email} onChange={(e) => Setemail(e.target.value)} placeholder="Email" />
               <input type='password' value={password} onChange={(e) => Setpassword(e.target.value)} placeholder='Password' />
               <input type='submit' />
           </form>
           <p>Already Have an account <button onClick={() => Setsignup(false)}>Sign in!</button></p>
       </div>
   )
}

export default Signup;