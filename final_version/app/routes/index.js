var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', function(req, res) {
  res.render('login-form');
});

router.post('/login', function(req, res) {
  axios.post('http://localhost:8002/users/login', req.body)
    .then(dados => {
      res.cookie('token', dados.data.token, {
        expires: new Date(Date.now() + '1d'),
        secure: false, // set to true if your using https
        httpOnly: true
      });
      res.redirect('/tarefas')
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/', function(req, res) {
  console.log(JSON.stringify(req.cookies))
  axios.get('http://localhost:8001/?token=' + req.cookies.token)
    .then(dados => res.render('listaRecursos', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});

router.get('/recursos/upload', function(req,res) {
  axios.get('http://localhost:8001/recursos/upload?token=' + req.cookies.token)
    .then(dados => res.render('form_upload', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
})


module.exports = router;
