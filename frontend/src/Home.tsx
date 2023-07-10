import React from 'react';
import './App.css';
import Header from './Header';
import ChatWindow from './ChatWIndow'
import Box from "@mui/material/Box"

function Home(){
    return (
    <div className="MainPage" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}>
      <div style= {{backgroundImage: `url("/Image.jpeg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: '25% 65%',
        width: '99vw',
        height: '100vh'
        }}>
          <ChatWindow/>
      </div>
    </div>
    )
}

export default Home