const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const cryptoRouter = require('./routes/cryptoRouter.js');
const fiatRouter = require('./routes/fiatRouter.js');

app.use('/api', cryptoRouter);
app.use('/api', fiatRouter);

app.get('/', (req, res) => {
    res.status(200).send('Backend is up and running!');
});

app.listen(PORT, () => console.log(`Server listenning on port ${PORT}`));
