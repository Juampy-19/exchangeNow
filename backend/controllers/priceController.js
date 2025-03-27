const axios = require('axios');

const getPrice = async (req, res) => {
    const { money, crypto } = req.query;
    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${money}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el precio.' });
    }
}

module.exports = { getPrice };