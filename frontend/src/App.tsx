import React from 'react';
import './App.css';
import Header from './Header';
import ChatWindow from './ChatWIndow'
import Box from "@mui/material/Box"

function App() {
  return (
    <div className="App">
      <Header></Header>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
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
  );
}

export default App;
