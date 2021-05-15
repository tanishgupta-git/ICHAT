import React,{useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const HomePage = () => {
    const [username,Setusername] = useState(""); 
    const handleSubmit = (e) => {
      e.preventDefault();
      Setusername("")
    }
    return (
       <div className='container my-5 py-5'>
           <h2 className="text-center mb-5">Welcome To The ICHAT Application</h2>
           <div className='my-5 row justify-content-center'>
            <Form onSubmit={handleSubmit} className='col-5'>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username :</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value={username} 
                    onChange={(e) => Setusername(e.target.value)} autoComplete="off" />
                </Form.Group>
                <Form.Text className="text-muted">Your username will be visible to everyone in the room.</Form.Text>
                <Button className='my-4' variant="primary" type="submit">Enter in the room</Button>
            </Form>
            </div>
       </div>
    )
} 

export default HomePage;