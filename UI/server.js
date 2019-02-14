const express = require('express')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'));


app.get('/', function (req, res) {
    res.redirect('validate');
});
app.get('/manual', function (req, res) {
  res.render('manual');
});
app.get('/auto', function (req, res) {
    res.render('auto');
});
app.get('/validate', function (req, res) {
    res.render('validate');
});
app.get('*', function(req, res) {
    res.status(404).end();
});


app.listen(5000, function () {
  console.log('App listening port 5000')
})