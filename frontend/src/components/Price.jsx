import { useState, useEffect } from 'react';
import axios from 'axios';

function Price() {
    const [price, setPrice] = useState(null);
    const [cryptos, setCryptos] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState('');

    useEffect(() => {
        const fetchCryptos = async () => {
            try  {
                const response = await axios.get('http://localhost:3001/api/price');
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

        try {
            const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${selectedCrypto}`);
            const formattedPrice = parseFloat(response.data.price).toFixed(2);
            setPrice(formattedPrice);
        } catch (error) {
            console.error('Error al obtener el precio: ', error.message);
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

            <button onClick={handleGetPrice} disabled={!selectedCrypto}>
                Obtener Precio
            </button>

            {price && <p>Precio: {price} usd</p>}
        </div>
    )
}

export default Price;