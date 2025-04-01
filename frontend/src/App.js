import React from'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Crypto from './components/Crypto.jsx';
import Fiat from './components/Fiat.jsx';

const App = () => {

  return (
    <Router>
      <h1>Exchange Now</h1>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/crypto' element={<Crypto />} />
        <Route path='/fiat' element={<Fiat />} />
      </Routes>
    </Router>
  );
};

export default App;
