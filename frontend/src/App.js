import React from 'react';
import logo from './logo.svg';
import './App.css';
import values from './values.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/Results" element={<Results />} />
          <Route path="/" element={<Home/>}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;