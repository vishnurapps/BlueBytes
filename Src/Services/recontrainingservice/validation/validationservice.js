const Util = require('../serviceutil.js');
const ValidationModel = require('./validationmodel.js');
// Use python shell
const {PythonShell} = require('python-shell')
const validationPythonScript =  __dirname + '/validation.py';


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
    console.log(genFiles);
}

/**
 * Register for Next image
 * 
 */
ValidationService.prototype.registerNextInput = function(app){
    app.get('/validation/next', function (req, res) {
        // 1. Get the Next input image url
        var nextInputUrl = Util.getFileUrl(Util.VALIDATION_MODE_IN_FOLDER + '/' + this.inputFiles[currentImageIndex]);
        var statusValue = currentImageIndex ==  this.inputFiles.length - 1 ? Util.STATUS_COMPLETED : Util.STATUS_NONE;
        var nextImageObj = { inputFile: nextInputUrl, status: statusValue }; 

        // 2. Update the response with next image url
        res.write(JSON.stringify(nextImageObj));
        res.end();
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

       console.log(inImage, outImage, genImage);

        // 2. Execute Python script to get the processed image path using AI model
        var options = {mode: 'text', args: [inImage, genImage]};
        PythonShell.run(validationPythonScript, options, function (err, results) {
            if (err) throw err;
            // results is an array consisting of messages collected during execution
            if(results[0] == Util.STATUS_COMPLETED){
                // 3. Prepare the validationModel with processed and expected out image url
                let percentage = 100;
                let status = Util.STATUS_COMPLETED;
                var validationModel = new ValidationModel(
                                    Util.getFileUrl(Util.VALIDATION_MODE_IN_FOLDER + '/' + this.inputFiles[currentImageIndex]),
                                    Util.getFileUrl(Util.VALIDATION_MODE_OUT_FOLDER + '/' + this.outputFiles[currentImageIndex]),
                                    Util.getFileUrl(Util.VALIDATION_MODE_GEN_FOLDER + '/' + this.genFiles[currentImageIndex]),                                    
                                    status, percentage);
                console.log(this.genFiles);
                // 4. Update the response with processed and expected out image url
                res.write(JSON.stringify(validationModel));
                res.end();
            }else{
                // 5. Updated with failure
                let percentage = 0;
                let status = Util.STATUS_FAILED;
                var autoModel = new ValidationModel(
                                    '', '', '',
                                    status, percentage);
                // 4. Update the response failure details
                res.write(JSON.stringify(autoModel));
                res.end();
            }

            // Update current image index and reset to 0 if greater.
            currentImageIndex++;
            if(currentImageIndex >= this.inputFiles.length){
                currentImageIndex = 0;
            }
        });
    });
}

module.exports = ValidationService;