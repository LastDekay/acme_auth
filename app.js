const express = require('express');
const app = express();
app.use(express.json());
const { models: { User }} = require('./db');
const path = require('path');
const JWT = require('jsonwebtoken')

const jwtSecretKey = process.env.BANANA;
console.log('JWT key',jwtSecretKey)
const token = JWT.sign({ dk: 'dan' }, jwtSecretKey);

console.log(token)
console.log(JWT.verify(token,jwtSecretKey))

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.post('/api/auth', async(req, res, next)=> {
  try {
    res.send({ token: await User.authenticate(req.body)});
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/auth', async(req, res, next)=> {
  try {
    res.send(await User.byToken(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = {
    app,
    jwtSecretKey: jwtSecretKey
};