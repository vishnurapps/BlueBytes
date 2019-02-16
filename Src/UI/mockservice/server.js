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
 mockiNext = -1;
 app.get('/test', function (req, res) {
    mocki = -1;
    res.end( JSON.stringify({"value": "1"}));
 });

 autoTrainMock = [{status: "Pending", percentage: 10,inputFile:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg", outfile:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg"},
                  {status: "Pending", percentage: 20,inputFile:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg", outfile:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg"},
                  {status: "Pending", percentage: 60,inputFile:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg", outfile:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg"},
                  {status: "Completed", percentage: 100,inputFile:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg", outfile:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg"}];

 app.get('/autoTrainStatus', function (req, res) {
   mocki = (++mocki)%4;
    setTimeout(function(){res.json(autoTrainMock[mocki])}, 1000);
 });

 MockNext = [{status: "ok", imageurl:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg"},
             {status: "ok", imageurl:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg"},
             {status: "done", imageurl:null}];
 app.get('/getNextValidation', function (req, res) {
    mockiNext = (++mockiNext)%3;
    setTimeout(function(){res.json(MockNext[mockiNext])}, 1000);
 });

 app.get('/getProcessed', function (req, res) {
   setTimeout(function(){res.json({opImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg", expImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg"})}, 1000);
});
 
mockmanualNexti =0;
MockNextManual = [{status: "Ok", input:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg"},
            {status: "Ok", input:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg"},
            {status: "Done", input:null}];

app.get('/getNextImageManual', function (req, res) {
   mockmanualNexti = (++mockmanualNexti)%3;
   setTimeout(function(){res.json(MockNextManual[mockmanualNexti])}, 1000);
});

var filterImages = {status: "Ok",
                    filterImages: ["https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg",
                                   "http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg",
                                   "https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg",
                                   "http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg"]};
app.get('/getFilterImages', function (req, res) {
   setTimeout(function(){res.json(filterImages)}, 1000);
});

app.post('/selectedFilter', jsonParser, function (req, res) {
   console.log(req.body);
   res.send();
});



 