const express = require('express')
const app = express()
const port = 3030;
const index = require('./index.js');
const test = 'salut';
const so = require("os");

const Gpio = require('onoff').Gpio;
const sleep = require('sleep');
const led = new Gpio(17, 'out');

const mustacheExpress = require('mustache-express');


app.engine('mustache',mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));



app.get('/', (request, response) => {
  response.send(test);
})

app.get('/hello/:name', (request, response) => {
  response.send('Hello, '+request.params.name+'!');
})

app.get('/date', (request, response) => {
  response.send(new Date());
})

app.get('/dc', (request, response) => {
  response.send('Vraiment nul à chier')
})

app.get('/dc/:cours', (request, response) => {
  
  response.send('Vraiment nul à chier cette matière : ' + request.params.cours)
 
})

app.get('/pooc', (request, response) => {
response.send('Bienvenue sur la page pooc')
})






app.listen(port, (err) => {
  if (err) {
    return console.log('Erreur du serveur : ', err)
  }

  console.log('Le serveur écoute sur le port '+port+'\nRendez vous sur http://localhost:'+port);
})






process.on('SIGINT', () => {
  led.unexport();
});