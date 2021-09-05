const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/users');
const routerCard = require('./routes/cards');


const { PORT = 3000 } = process.env;
 
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '61339160637678ff8ab38409'
  };

  next();
});

app.use(router);
app.use(routerCard);
app.use((req, res) => {
  res.status(404).send({ message: '404 NotFound' })
});

app.listen(PORT, () => {
    console.log(`Слушаем порт: ${PORT}`);
});