const axios =  require('axios');

const fiatPrice = async (req, res) => {
    const { from, to } = req.query;
    try {
        const url = `https://api.exchangerate-api.com/v4/latest/${from}`;
        const response =  await axios.get(url);
        const fiat = response.data.rates[to];

        if (!fiat) {
            return res.status(404).json({ error: 'No se encontró la moneda.' });
        }

        res.json({ fiat });
    } catch (error) {
        console.error('Error al obtener el precio: ', error);
        res.status(500).json({ error: 'Error al obtener el precio.' });
    }
}

module.exports = { fiatPrice };