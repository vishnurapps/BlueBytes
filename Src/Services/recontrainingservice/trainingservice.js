var express = require('express');

// Custom
const Util = require('./serviceutil.js')
const AutoTrainingService = require('./auto/autotrainingservice.js');


// Create Express instance
var app = express();

// Register the public folder
app.use(express.static(Util.PUBLIC_RESOURCE_FULL_PATH));

// Added for allowing CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Register Auto Training
var autoService = new AutoTrainingService();
autoService.registerAutoTraining(app);


// Server listen for the connections
var server = app.listen(Util.PORT, Util.HOST_NAME, function () {
    console.log("Training Service listening at http://%s:%s", Util.HOST_NAME, Util.PORT);
});

// autoTrainMock = [{status: "", perc: 10,ipImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg", opImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg"},
//                  {status: "", perc: 20,ipImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg", opImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg"},
//                  {status: "", perc: 60,ipImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg", opImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg"},
//                  {status: "Completed", perc: 100,ipImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg", opImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg"}];


// app.get('/manualtraining', function (req, res) {
//   // Read the files from both input and output folders
//   const inputFiles = fs.readdirSync(autoModeInputFolder);
//   const outputFiles = fs.readdirSync(autoModeOutputFolder);
//   // const outputFiles = fs.readdirSync(autoModeOutputFolder);  

//   let index = 0;
//   setTimeout(function(){res.json(autoTrainMock[index])}, 1000);
// });


// validationMock = [{ipImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg", opImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg"},
//                  {ipImage:"http://a360-wp-uploads.s3.amazonaws.com/wp-content/uploads/x7mag/2017/10/dreamstime_s_68930604-466x310.jpg", opImage:"https://www.fda.gov/ucm/groups/fdagov-public/documents/image/ucm437096.jpg"}];


// app.get('/validation/next', function (req, res) {
//   // 1. Get the Next input image url
//   ++mocki;

//   // 2. Update the response with next image url
//   setTimeout(()=>{res.json(autoTrainMock[mocki])}, 1000);  
// });

// app.get('/validation/process', function (req, res) {
//   // 1. Get the current image url



//   // 2. Execute Python script to get the processed image path using AI model


//   // 3. Get the expected output image url


//   // 4. Update the response with processed and expected out image url

//    ++mocki;
//   setTimeout(function(){res.json(autoTrainMock[mocki])}, 1000);
// });