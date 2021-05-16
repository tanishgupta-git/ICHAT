import React,{useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const HomePage = ({socket}) => {
    const [username,Setusername] = useState(""); 
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return 
        }
     if (socket) {
      socket.emit('userEnterRoom',{ username:username});
      socket.on('userEnterdenied',function(data){
        console.log(data);
      });
      socket.on('users',function(data){
        console.log(data);
      });
      socket.on('userdisconnected',function(data){
       console.log(data)          
    })
 }
    }
 

    return (
       <div className='container my-5 py-5'>
           <h2 className="text-center mb-5">Welcome To The ICHAT Application</h2>
           <div className='my-5 row justify-content-center'>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className='col-5'>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username :</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value={username} 
                    onChange={(e) => Setusername(e.target.value)}  required autoComplete="off" />
                </Form.Group>
                <Form.Text className="text-muted">Your username will be visible to everyone in the room.</Form.Text>
                <Button className='my-4' variant="primary" type="submit">Enter in the room</Button>
            </Form>
            </div>
       </div>
    )
} 

export default HomePage;