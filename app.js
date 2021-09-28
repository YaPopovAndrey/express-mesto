/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes/users');
const routerCard = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { errors } = require('./middlewares/errors');
const NotFound = require('./errors/NotFound');
const { validateSigIn, validateSigUp } = require('./middlewares/Validation');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', validateSigIn, login);
app.post('/signup', validateSigUp, createUser);

app.use(auth);

app.use(router);
app.use(routerCard);
app.use(errors);
app.use(() => {
  throw new NotFound('Страницы не существует');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Слушаем порт: ${PORT}`);
});
