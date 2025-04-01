import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading.jsx';

function Crypto() {
    const [price, setPrice] = useState(null);
    const [cryptos, setCryptos] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCryptos = async () => {
            try  {
                const response = await axios.get('http://localhost:3001/api/crypto');
                setCryptos(response.data);
            } catch (error) {
                console.error('Error al obtener criptomonedas: ', error.message)
            }
        };

        fetchCryptos();
    }, []);

    const handleSelectChange = (e) => {
        setSelectedCrypto(e.target.value);
    };

    const handleGetPrice = async () => {
        if (!selectedCrypto) return;
        setLoading(true);

        try {
            const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${selectedCrypto}`);
            const formattedPrice = parseFloat(response.data.price).toFixed(2);
            setPrice(formattedPrice);
        } catch (error) {
            console.error('Error al obtener el precio: ', error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Precio de criptomonedas</h1>
            <select value={selectedCrypto} onChange={handleSelectChange}>
                <option value=''>Seleccione una criptomoneda</option>
                {cryptos.map((crypto) => (
                    <option key={crypto.symbol} value={crypto.symbol}>
                        {crypto.symbol}
                    </option>
                ))}
            </select>

            <button onClick={handleGetPrice} disabled={!selectedCrypto}>Cotizar</button>

            { loading ? (
                <Loading />
            ) : (
                price && <p>Precio: {price} usd</p>
            )}

            <Link to='/'>
                <button>Inicio</button>
            </Link>
        </div>
    )
}

export default Crypto;