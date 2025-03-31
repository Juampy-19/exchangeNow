import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <Link to='/crypto'>
                <button>Criptomonedas</button>
            </Link>
            <Link to='/fiat'>
                <button>Monedas Oficiales</button>
            </Link>
        </div>
    )
}

export default Home;