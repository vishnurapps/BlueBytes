const Util = require('../serviceutil.js')
const ValidationModel = require('./validationmodel.js');

global.currentImageIndex = 0;
module.inputFiles = new Array();
module.outputFiles = new Array();
module.genFiles = new Array();

function ValidationService(){
    // Read the files from both input and output folders
    inputFiles = Util.getResourceFiles(Util.VALIDATION_MODE_IN_FOLDER);
    outputFiles = Util.getResourceFiles(Util.VALIDATION_MODE_OUT_FOLDER);
    createGenFilePaths();
}

function createGenFilePaths(){
    this.genFiles = new Array();
    for(let index = 0; index < inputFiles.length; index++){
        this.genFiles[index] = inputFiles[index];
    }
    console.log(inputFiles);
}

/**
 * Register for Next image
 * 
 */
ValidationService.prototype.registerNextInput = function(app){
    app.get('/validation/next', function (req, res) {
        // 1. Get the Next input image url
        var nextInputUrl = Util.getFileUrl(Util.VALIDATION_MODE_IN_FOLDER + '/' + this.inputFiles[currentImageIndex++]);
        var nextImageObj = { inputFile: nextInputUrl, status: Util.STATUS_NONE }; 

        // 2. Update the response with next image url
        res.write(JSON.stringify(nextImageObj));
        res.end();
        if(currentImageIndex >= this.inputFiles.length){
            currentImageIndex = 0;
        }
    });
}

/**
 * Register for Process using AI model
 * 
 */
ValidationService.prototype.registerValidationProcess = function(app){
    app.get('/validation/process', function (req, res) {
        // 1. Get the current image url

        // 2. Execute Python script to get the processed image path using AI model


        // 3. Get the expected output image url


        // 4. Update the response with processed and expected out image url
        res.write("TODO");
        res.end();
    });
}
module.exports = ValidationService;