const express = require('express')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  	res.redirect('auto');
});
app.get('/auto', function (req, res) {
    res.render('auto');
});

app.get('/manual', function (req, res) {
  res.render('manual');
});
app.get('/validate', function (req, res) {
    res.render('validate');
});
app.get('*', function(req, res) {
    res.status(404).end();
});


app.listen(5000, function () {
  console.log('App listening port 5000')
});