import React,{useEffect} from 'react';
import openSocket from 'socket.io-client';
import Header from './components/Header/Header';
import HomePage from './pages/homePage/homePage';


function App() {
  useEffect(()=> {
    openSocket('http://localhost:5000');
  },[])

  return (
    <div className="App">
     <Header />
     <HomePage />
    </div>
  );
}

export default App;