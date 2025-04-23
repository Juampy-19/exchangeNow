import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button.jsx';
import Loading from './Loading.jsx';

function Crypto() {
    const [price, setPrice] = useState(null);
    const [cryptos, setCryptos] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState('');
    const [error, setError] = useState('');
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

    useEffect(() => {
        setPrice('');
        setError('');
    }, [selectedCrypto]);

    const handleGetPrice = async () => {
        if (!selectedCrypto) {
            setError('Seleccione una criptomoneda');
            return;
        }
        setPrice('');
        setError('');
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
        <div className='flex flex-col items-center justify-between gap-20'>
            <h1 className='mt-[50px] text-xl font-semibold'>
                Precio de criptomonedas
            </h1>
            <div className='h-[8em] md:h-[0]'>
                <select value={selectedCrypto} onChange={handleSelectChange} className='text-black rounded-xl text-lg px-2'>
                    <option value=''>Seleccione una criptomoneda</option>
                    {cryptos.map((crypto) => (
                        <option key={crypto.symbol} value={crypto.symbol}>
                            {crypto.symbol}
                        </option>
                    ))}
                </select>
            </div>

            <div className='h-[10%]'>
                {loading ? (
                    <Loading />
                ) : price ? (
                    <p>Precio: {price} usd</p>
                ) : error ? (
                    <p>{error}</p>
                ) : null}
            </div>

            <div className='flex flex-col gap-5 mb-[15px]'>
                <Button onClick={handleGetPrice} >Cotizar</Button>
                <Button to='/'>Inicio</Button>
            </div>
        </div>
    )
}

export default Crypto;