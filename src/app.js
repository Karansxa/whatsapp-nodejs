const express = require('express');
const app = express();
const cors = require('cors');
const limiter = require('./middleware/rateLimiter');
const redis = require('./config/redis');
const { connectDB } = require('./config/prisma');


app.use(cors());
app.use(express.json());
connectDB()

//Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', limiter, require('./routes/routes'));

module.exports = app;