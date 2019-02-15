var express = require('express');
var app = express();

// for allowing CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var jsonParser = bodyParser.json();


var server = app.listen(5001, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("mock app listening at http://%s:%s", host, port)
 });

 app.post('/initAutoTrain', jsonParser, function (request, res) {
    console.log(request.body);
    res.json({status: "ok"});
 });
 var mocki = -1;
 app.get('/test', function (req, res) {
    mocki = -1;
    res.end( JSON.stringify({"value": "1"}));
 });

 autoTrainMock = [{status: "", perc: 10,ipImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg", opImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg"},
                  {status: "", perc: 20,ipImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg", opImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg"},
                  {status: "", perc: 60,ipImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg", opImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg"},
                  {status: "done", perc: 100,ipImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg", opImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg"}];

 app.get('/autoTrainStatus', function (req, res) {
     ++mocki;
    setTimeout(function(){res.json(autoTrainMock[mocki])}, 1000);
 });