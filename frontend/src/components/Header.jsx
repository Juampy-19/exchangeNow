import React from 'react';
import DarkModeToggle from './DarkModeToggle';

const Header = () => {
  return (
      <div>
          <div className='w-[100%] flex justify-end p-3 mb-[5px]'>
              <DarkModeToggle />
          </div>
          <div className='w-[100%] flex flex-col items-center justify-center mb-[10px] gap-[8px]'>
              <img src="/logo-removebg-preview.png" alt="Logo de Exchange Now" className='w-[50%] md:w-[20%] p-3' />
              <h1 className='font-semibold text-xl'>
                  Exchange Now
              </h1>
          </div>
      </div>
  )
}

export default Header
