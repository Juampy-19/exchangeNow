import React from 'react';
import Button from './Button';
const Home = () => {
    return (
        <div className='h-[80%] flex flex-col items-center justify-center gap-20'>
            <Button to='/crypto'>Criptomonedas</Button>
            <Button to='/fiat'>Monedas Oficiales</Button>
        </div>
    )
}

export default Home;