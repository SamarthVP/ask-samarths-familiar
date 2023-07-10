import React from 'react';
import './App.css';
import Header from './Header';
import ChatWindow from './ChatWIndow'
import Box from "@mui/material/Box"
import Home from "./Home"
import Resume from "./Resume"
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Resume' element={<Resume/>}/>
      </Routes>
    </Router>
  );
}

export default App;
