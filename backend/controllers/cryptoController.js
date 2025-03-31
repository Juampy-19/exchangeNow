const axios = require('axios');

const cryptoPrice = async (req, res) => {
    // const { money, crypto } = req.query;
    try {
        const url = `https://api.binance.com/api/v3/ticker/price`;
        const response = await axios.get(url);
        const cryptos = response.data;

        // Filtro solo algunas de las criptomonedas.
        const topCryptos = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'DOGEUSDT'];
        const filteredCryptos = cryptos.filter(crypto => topCryptos.includes(crypto.symbol));

        res.json(filteredCryptos);
    } catch (error) {
        console.error('Error al obtener el precio: ', error.message);
        res.status(500).json({ error: 'Error al obtener el precio.' });
    }
}

module.exports = { cryptoPrice };