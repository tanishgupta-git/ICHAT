import React,{useEffect} from 'react';
import openSocket from 'socket.io-client';


function App() {
 

  useEffect(()=> {
 

    openSocket('http://localhost:5000');
  },[])

  return (
    <div className="App">
    <h1>Hello from the new begining</h1>
    </div>
  );
}

export default App;