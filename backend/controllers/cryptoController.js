const axios = require('axios');

// Cache para la API de Coingecko.
let cacheData = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30 * 60 * 1000;

const cryptoPrice = async (req, res) => {
    // API de Binance
    // try {
    //     const url = `https://api.binance.com/api/v3/ticker/price`;
    //     const response = await axios.get(url);
    //     const cryptos = response.data;

    //     console.log('Datos recibidos de Binance: ', cryptos);
        

    //     // Filtro solo algunas de las criptomonedas.
    //     const topCryptos = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'DOGEUSDT'];
    //     const filteredCryptos = cryptos.filter(crypto => topCryptos.includes(crypto.symbol));

    //     res.json(filteredCryptos);
    // } catch (error) {
    //     console.error('Error al obtener el precio: ', error.message);
    //     res.status(500).json({ error: 'Error al obtener el precio.' });
    // }

    // API de Coingecko
    const now = Date.now();

    // Si los datos del cache no vencieron, se devuelven.
    if (cacheData && (now - cacheTimestamp < CACHE_DURATION)) {
        console.log('Enviando datos desde el cache');
        return res.json(cacheData);
    }

    try {
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,cardano,dogecoin&vs_currencies=usd';
        const response = await axios.get(url);
        const price = response.data;
        
        // Filtro solo algunas criptomonedas.
        const filteredCryptos = [
            { symbol: 'BTCUSDT', price: price.bitcoin.usd.toString() },
            { symbol: 'ETHUSDT', price: price.ethereum.usd.toString() },
            { symbol: 'BNBUSDT', price: price.binancecoin.usd.toString() },
            { symbol: 'ADAUSDT', price: price.cardano.usd.toString() },
            { symbol: 'DOGEUSDT', price: price.dogecoin.usd.toString() },
        ];

        // Guardo en caché.
        cacheData = filteredCryptos;
        cacheTimestamp = now;

        console.log('Datos obtenidos de la API');        
        res.json(filteredCryptos);
    } catch (error) {
        console.error('Error al obtener el precio: ', error.message);
        res.status(500).json({ error: 'Error al obtener el precio.'});
    }
}

module.exports = { cryptoPrice };