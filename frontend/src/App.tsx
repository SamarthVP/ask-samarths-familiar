import React from 'react';
import './App.css';
import Header from './Header';

import ChatBot from 'react-simple-chatbot';

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
      <ChatBot
      width={1000}
      steps={[
        {
          id: 'hello-world',
          message: 'Hello World!',
          trigger: 'hello-world',
        },
      ]}
    />
    </div>
  );
}

export default App;
