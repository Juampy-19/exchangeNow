import React from'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Crypto from './components/Crypto.jsx';
import Fiat from './components/Fiat.jsx';
import Header from './components/Header.jsx';

const App = () => {

  return (    
    <div className='min-h-screen bg-slate-400 dark:bg-slate-800 text-slate-800 dark:text-white font-lato'>
      <Header />
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/crypto' element={<Crypto />} />
            <Route path='/fiat' element={<Fiat />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
