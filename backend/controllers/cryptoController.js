const axios = require('axios');

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
    try {
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,cardano,dogecoin&vs_currencies=usd';
        response = await axios.get(url);
        const price = response.data;
        
        // Filtro solo algunas criptomonedas.
        const filteredCryptos = [
            { symbol: 'BTCUSDT', price: price.bitcoin.usd.toString() },
            { symbol: 'ETHUSDT', price: price.ethereum.usd.toString() },
            { symbol: 'BNBUSDT', price: price.binancecoin.usd.toString() },
            { symbol: 'ADAUSDT', price: price.cardano.usd.toString() },
            { symbol: 'DOGEUSDT', price: price.dogecoin.usd.toString() },
        ];

        res.json(filteredCryptos);
    } catch (error) {
        console.error('Error al obtener el precio: ', error.message);
        res.status(500).json({ error: 'Error al obtener el precio.'});
    }
}

module.exports = { cryptoPrice };