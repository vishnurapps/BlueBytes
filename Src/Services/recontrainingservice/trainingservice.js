var express = require('express');
// Create Express , http and IO instance
var app = express();
//var http = require('http').Server(app);
//var io = require('socket.io')(http);

// Custom
const Util = require('./serviceutil.js')
const AutoTrainingService = require('./auto/autotrainingservice.js');
const ManualTrainingService = require('./manual/manualtrainingservice.js');
const ValidationService = require('./validation/validationservice.js');


// Create Express instance
//var app = express();

// Register the public folder
app.use(express.static(Util.PUBLIC_RESOURCE_FULL_PATH));

// Added for allowing CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Register Auto Training methods
var autoService = new AutoTrainingService();
autoService.registerAutoTraining(app);

// Register Manual methods
var manualService = new ManualTrainingService();
manualService.registerNextInput(app);
manualService.registerManualProcess(app);

// Register Validation methods
var validationService = new ValidationService();
validationService.registerNextInput(app);
validationService.registerValidationProcess(app);

// Server listen for the connections
var server = app.listen(Util.PORT, Util.HOST_NAME, function () {
    console.log("Training Service listening at http://%s:%s", Util.HOST_NAME, Util.PORT);
});

var io = require('socket.io')(server);

// Socket IO Connection and updating to all services
io.on('connection', function(socket){
  console.log('a user connected');
  autoService.setSocket(socket);
  manualService.setSocket(socket);
  validationService.setSocket(socket);
});
