const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const weather = require('./routes/weather');
const flag = require('./routes/flag');
const dad = require('./routes/dad');
const coronavirus = require('./routes/coronavirus');
const hdDonations = require('./routes/hdDonations');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/weather', weather);
app.use('/flag', flag);
app.use('/dad', dad);
app.use('/coronavirus', coronavirus);
app.use('/hdDonations', hdDonations);

app.get('/', (req, res) => {
  res.json({
    status: 200,
    hello: 'world!',
  });
});

app.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    msg: 'Endpoint not found!',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    msg: err.message || 'Something broke!',
  });
});

app.listen(port, () => console.log(`Listening at port ${port}`));
