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

ValidationService.prototype.setSocket = function(socket){
	module.socket = socket;
}

/**
 * Register for Next image
 * 
 */
ValidationService.prototype.registerNextInput = function(app){
    app.get(Util.VALIDATION_NEXT_REQUEST_URL, function (req, res) {
		// Reply acknowledgment
		res.end();
		
        // 1. Get the Next input image url
        var nextInputUrl = Util.getFileUrl(Util.VALIDATION_MODE_IN_FOLDER + '/' + this.inputFiles[currentImageIndex]);
        var statusValue = currentImageIndex ==  this.inputFiles.length - 1 ? Util.STATUS_COMPLETED : Util.STATUS_NONE;
        var nextImageObj = { inputFile: nextInputUrl, status: statusValue }; 
		

        // 2. Update the response with next image url
		module.socket.emit(Util.VALIDATION_NEXT_RESPONSE_URL,  nextImageObj);
        //res.write(JSON.stringify(nextImageObj));
        //res.end();
    });
}

/**
 * Register for Process using AI model
 * 
 */
/*ValidationService.prototype.registerValidationProcess = function(app){
    app.get(Util.VALIDATION_PROCESS_REQUEST_URL, function (req, res) {
		// Reply acknowledgment
		res.end();
	
        // 1. Get the current input, generated and output image path
        var inImage = Util.getFullFilePath(Util.VALIDATION_MODE_IN_FOLDER + '/' + this.inputFiles[currentImageIndex]);
        var outImage = Util.getFullFilePath(Util.VALIDATION_MODE_OUT_FOLDER + '/' + this.outputFiles[currentImageIndex]);
        var genImage = Util.getFullFilePath(Util.VALIDATION_MODE_GEN_FOLDER + '/' + this.genFiles[currentImageIndex]);

        //console.log(inImage, outImage, genImage);

        // 2. Execute Python script to get the processed image path using AI model
        var options = {mode: 'text', args: [inImage, genImage]};
        PythonShell.run(validationPythonScript, options, function (err, results) {
			console.log(err);
			console.log(results);
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
				module.socket.emit(Util.VALIDATION_PROCESS_RESPONSE_URL,  validationModel);				
                //res.write(JSON.stringify(validationModel));
                //res.end();
            }else{
                // 5. Updated with failure
                let percentage = 0;
                let status = Util.STATUS_FAILED;
                var validationModel = new ValidationModel(
                                    '', '', '',
                                    status, percentage);
                // 4. Update the response failure details
				module.socket.emit(Util.VALIDATION_PROCESS_RESPONSE_URL,  validationModel);						
                //res.write(JSON.stringify(validationModel));
                //res.end();
            }

            // Update current image index and reset to 0 if greater.
            currentImageIndex++;
            if(currentImageIndex >= this.inputFiles.length){
                currentImageIndex = 0;
            }
        });
    });
}*/

//TEST SAMPLE
/**
 * Register for Process using AI model
 * 
 */
ValidationService.prototype.registerValidationProcess = function(app){
    app.get(Util.VALIDATION_PROCESS_REQUEST_URL, function (req, res) {
		// Reply acknowledgment
		res.end();
	
        // 1. Get the current input, generated and output image path
        var inImage = Util.getFullFilePath(Util.VALIDATION_MODE_IN_FOLDER + '/' + this.inputFiles[currentImageIndex]);
        var outImage = Util.getFullFilePath(Util.VALIDATION_MODE_OUT_FOLDER + '/' + this.outputFiles[currentImageIndex]); 
        var genImage = Util.getFullFilePath(Util.VALIDATION_MODE_IN_FOLDER + '/' + this.inputFiles[currentImageIndex]); //TEMPORARY FOR TESTING

		
        //console.log(inImage, outImage, genImage);

		// 3. Prepare the validationModel with processed and expected out image url
		let percentage = 100;
		let status = Util.STATUS_COMPLETED;
		var validationModel = new ValidationModel(
							Util.getFileUrl(Util.VALIDATION_MODE_IN_FOLDER + '/' + this.inputFiles[currentImageIndex]),
							Util.getFileUrl(Util.VALIDATION_MODE_OUT_FOLDER + '/' + this.outputFiles[currentImageIndex]),
							Util.getFileUrl(Util.VALIDATION_MODE_IN_FOLDER + '/' + this.inputFiles[currentImageIndex]), //TEMPORARY FOR TESTING                                   
							status, percentage);
		console.log(this.genFiles);
		// 4. Update the response with processed and expected out image url
		module.socket.emit(Util.VALIDATION_PROCESS_RESPONSE_URL,  validationModel);	
	
		console.log(inImage, outImage, genImage);

		// Update current image index and reset to 0 if greater.
		currentImageIndex++;
		if(currentImageIndex >= this.inputFiles.length){
			currentImageIndex = 0;
		}
    });
}

module.exports = ValidationService;