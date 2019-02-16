const Util = require('../serviceutil.js');
const ManualTrainingModel = require('./manualtrainingmodel.js');

global.currentImageIndex = 0;
module.inputFiles = new Array();
module.outputFiles = new Array();
module.genFiles = new Array();

function ManualTrainingService(){
    // Read the files from both input and output folders
    inputFiles = Util.getResourceFiles(Util.MANUAL_MODE_IN_FOLDER);
    outputFiles = Util.getResourceFiles(Util.MANUAL_MODE_OUT_FOLDER);
    createGenFilePaths();
}

// ::TODO::
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
ManualTrainingService.prototype.registerNextInput = function(app){
    app.get('/manual/next', function (req, res) {
        // 1. Get the Next input image url
        var nextInputUrl = Util.getFileUrl(Util.MANUAL_MODE_IN_FOLDER + '/' + this.inputFiles[currentImageIndex]);
        var statusValue = currentImageIndex ==  this.inputFiles.length - 1 ? Util.STATUS_COMPLETED : Util.STATUS_NONE;
        var nextImageObj = { inputFile: nextInputUrl, status: statusValue }; 

        // 2. Update the response with next image url
        res.write(JSON.stringify(nextImageObj));
        res.end();
    });
}

/**
 * Register for Process using Different Filters
 * 
 */
ManualTrainingService.prototype.registerManualProcess = function(app){
    app.get('/manual/process', function (req, res) {
        // 1. Get the current input, generated and output image urls
        var inImageUrl = Util.getFileUrl(Util.MANUAL_MODE_IN_FOLDER + '/' + this.inputFiles[currentImageIndex]);
        var outImageUrl = Util.getFileUrl(Util.MANUAL_MODE_OUT_FOLDER + '/' + this.outputFiles[currentImageIndex]);
        var genImageUrlArray = new Array();
        for(var index = 1; index <= 4; index++){
            genImageUrlArray[index - 1] = Util.getFileUrl(Util.MANUAL_MODE_GEN_FOLDER + '/' + 'b' + index + '/'
                                         + this.genFiles[currentImageIndex]);
        }
        console.log(inImageUrl, outImageUrl, genImageUrlArray);

        // 3. Prepare the Manual model with processed and expected out image url
        let percentage = 100;
        let status = Util.STATUS_COMPLETED;
        var manualTrainingModel = new ManualTrainingModel(
                                    inImageUrl, outImageUrl, genImageUrlArray,
                                    status, percentage);
        // 4. Update the response with processed and expected out image url
        res.write(JSON.stringify(manualTrainingModel));
        res.end();


        // Update current image index and reset to 0 if greater.
        currentImageIndex++;
        if(currentImageIndex >= this.inputFiles.length){
            currentImageIndex = 0;
        }
    });
}

module.exports = ManualTrainingService;