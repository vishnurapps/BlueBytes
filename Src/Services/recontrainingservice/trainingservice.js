var express = require('express');
const fs = require('fs');
const url = require('url');


const AutoTrainingModel = require('./autotrainingmodel.js');
const ValidationModel = require('./validationmodel.js');

// Constants
const hostname = "localhost";
const port = 5002;

const autoModeInputFolder = "/auto/input";
const autoModeOutputFolder = "/auto/output";

const manualModeInputFolder = "/manual/input";
const manualModeOutputFolder = "/manual/output";
const manualModeGeneratorFolder = "/manual/gen";

const validationModeInputFolder = "/validation/input";
const validationModeOutputFolder = "/validation/output";
const validationModeGeneratorFolder = "/validation/gen";

var app = express();
var publicDir = require('path').join(__dirname, '/TestData');
app.use(express.static(publicDir));

// for allowing CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Server listen for the connections
var server = app.listen(port, hostname, function () {
    console.log("Training Service listening at http://%s:%s", hostname, port)
});

/************** AUTO Training *****************/
app.get('/autotraining', function (req, res) {
  // Read the files from both input and output folders
  const inputFiles = fs.readdirSync(getFullPath(autoModeInputFolder));
  const outputFiles = fs.readdirSync(getFullPath(autoModeOutputFolder));

  // 1. Find and send each Training images (input and output)
  for(let index = 0; index < inputFiles.length; index++){
    let percentage = ((index + 1)/inputFiles.length) * 100;
    let status = (percentage == 100) ? "Pending" : "Done";
    var autoModel = new AutoTrainingModel(
                      getURl(autoModeInputFolder+ '/' + inputFiles[index]), 
                      getURl(autoModeOutputFolder + '/' + outputFiles[index]), 
                      status, percentage);

    res.write(JSON.stringify(autoModel));
    //setTimeout(function(){res.json(autoModel)}, 1000);
    //res.json(autoModel);
    //console.log(autoModel.inputFile)
  }  
  res.end();
  console.log('1');
  //res.json("DONE");
  console.log('2');
  //res.end();
  console.log('3');
});

function getFullPath(path){
  return require('path').join(publicDir, path);
}

function getURl(path){
  //console.log(path);
  return url.parse('http://' + hostname + ':' + port + '/' + path).href;
 // return new URL(path, 'http://' + hostname + ':' + port);
}




var mocki = -1;
//  app.get('/test', function (req, res) {
//     mocki = -1;
//     res.end( JSON.stringify({"value": "1"}));
//  });


// autoTrainMock = [{status: "", perc: 10,ipImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg", opImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg"},
//                  {status: "", perc: 20,ipImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg", opImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg"},
//                  {status: "", perc: 60,ipImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg", opImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg"},
//                  {status: "Completed", perc: 100,ipImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg", opImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg"}];


app.get('/manualtraining', function (req, res) {
  // Read the files from both input and output folders
  const inputFiles = fs.readdirSync(autoModeInputFolder);
  const outputFiles = fs.readdirSync(autoModeOutputFolder);
  // const outputFiles = fs.readdirSync(autoModeOutputFolder);  

  let index = 0;
  setTimeout(function(){res.json(autoTrainMock[index])}, 1000);
});


validationMock = [{ipImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg", opImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg"},
                 {ipImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg", opImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg"}];


app.get('/validation/next', function (req, res) {
  // 1. Get the Next input image url
  ++mocki;

  // 2. Update the response with next image url
  setTimeout(()=>{res.json(autoTrainMock[mocki])}, 1000);  
});

app.get('/validation/process', function (req, res) {
  // 1. Get the current image url



  // 2. Execute Python script to get the processed image path using AI model


  // 3. Get the expected output image url


  // 4. Update the response with processed and expected out image url

   ++mocki;
  setTimeout(function(){res.json(autoTrainMock[mocki])}, 1000);
});