const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const priceRouter = require('./routes/priceRouter.js');

app.use('/api', priceRouter);

app.listen(PORT, () => console.log(`Server listenning on port ${PORT}`));
