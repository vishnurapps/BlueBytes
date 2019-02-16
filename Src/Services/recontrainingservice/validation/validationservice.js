const Util = require('../serviceutil.js')
const ValidationModel = require('./validationmodel.js');
// Use python shell
const {PythonShell} = require('python-shell')
const validationPythonScript =  __dirname + '/validation.py';
//var pyshell = new PythonShell(validationPythonScript);


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
        // 1. Get the current input, generated and output image path
        var inImage = Util.getFullFilePath(Util.VALIDATION_MODE_IN_FOLDER + '/' + this.inputFiles[currentImageIndex]);
        var outImage = Util.getFullFilePath(Util.VALIDATION_MODE_OUT_FOLDER + '/' + this.outputFiles[currentImageIndex]);
        var genImage = Util.getFullFilePath(Util.VALIDATION_MODE_GEN_FOLDER + '/' + this.genFiles[currentImageIndex]);

       // console.log(inImage, outImage, genImage);

        // 2. Execute Python script to get the processed image path using AI model
        var options = {mode: 'text', args: [inImage, genImage]};
        PythonShell.run(validationPythonScript, options, function (err, results) {
            if (err) throw err;
            // results is an array consisting of messages collected during execution
            console.log('results: %j', results);
        });

        // 3. Get the expected output image url


        // 4. Update the response with processed and expected out image url
        res.write("TODO");
        res.end();
    });
}





module.exports = ValidationService;