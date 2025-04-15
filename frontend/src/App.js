import React from'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DarkModeToggle from './components/DarkModeToggle.jsx';
import Home from './components/Home.jsx';
import Crypto from './components/Crypto.jsx';
import Fiat from './components/Fiat.jsx';

const App = () => {

  return (
    <div className='h-screen bg-slate-400 dark:bg-slate-800 text-slate-800 dark:text-white flex-col '>
      <div className='flex items-center justify-center h-[20%]'>
        <DarkModeToggle />
        <h1>Exchange Now</h1>
        {/* <img src='/DALL·E 2025-03-13 14.45.46 - B' /> */}
      </div>

      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/crypto' element={<Crypto />} />
          <Route path='/fiat' element={<Fiat />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
