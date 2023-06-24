require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const handleErrors = require('./middlewares/handleErrors');
const limiter = require('./middlewares/rateLimit');
const { PORT, Database } = require('./utils/config');

const app = express();

app.use(cors());

mongoose.set('strictQuery', true);
mongoose.connect(Database)
  .then(() => console.log('Database connected.'))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
