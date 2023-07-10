import React from 'react';
import './App.css';
import Header from './Header';
import ChatWindow from './ChatWIndow'
import Box from "@mui/material/Box"

function Home(){
    return (
    <div className="App">
      <div style= {{backgroundImage: `url("/Image.jpeg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: '25% 65%',
        width: '100vw',
        height: '100vh'
        }}>
          <ChatWindow/>
      </div>
    </div>
    )
}

export default Home