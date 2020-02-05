const express = require('express')
const app = express()
const port = 3030;
const index = require('./index.js');
const test = 'salut';
const so = require("os");

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

app.get('/on', (request, response) => {
  const Gpio = require('onoff').Gpio;
  const sleep = require('sleep');
  //Création d'une variable qui va nous permettre d'accéder à un GPIO du raspberry  
  //⚠️ Le nombre passé en paramètre correspond au numéro de GPIO et non au numéro de la pin.
  const led = new Gpio(17, 'out');
  
  console.log('Led On');
  //On indique à la pin GPIO 4 que l'on veut envoyer du courant sur celle-ci
  led.writeSync(1);
 
  console.log('Led Off');
  
  //On indique qu'on a fini d'utiliser la pin GPIO 4.
  led.unexport();
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