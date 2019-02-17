const Util = require('../serviceutil.js')
const AutoTrainingModel = require('./autotrainingmodel.js');

module.inputFiles = new Array();
module.outputFiles = new Array();

function AutoTrainingService(){
    // Read the fileUrls from both input and output folders
    this.inputFiles = Util.getResourceFiles(Util.AUTO_MODE_IN_FOLDER);
    this.outputFiles = Util.getResourceFiles(Util.AUTO_MODE_OUT_FOLDER);
}

AutoTrainingService.prototype.setSocket = function(socket){
	module.socket = socket;
}

/**
 * Register Auto Training
 */
AutoTrainingService.prototype.registerAutoTraining = function(app){
    app.get(Util.AUTO_REQUEST_URL, function (req, res) {  
		// Reply acknowledgment
		res.end();
		
        // Loop through each Training images (input and output) ans send to client as callbacks
        for(let index = 0; index < this.inputFiles.length; index++){
			let percentage = parseInt(((index + 1)/this.inputFiles.length) * 100);
			let status = (percentage == 100) ? Util.STATUS_PENDING : Util.STATUS_COMPLETED;
			let autoModel = new AutoTrainingModel(
							Util.getFileUrl(Util.AUTO_MODE_IN_FOLDER + '/' + this.inputFiles[index]),
							Util.getFileUrl(Util.AUTO_MODE_OUT_FOLDER + '/' + this.outputFiles[index]),
							status, percentage);

			// Send the response with delay
			setTimeout((model)=>{
				module.socket.emit(Util.AUTO_RESPONSE_URL,  model);
			}, Util.AUTO_SERVICE_RESPONSE_DELAY * index, autoModel)
        }  
    });
}

module.exports = AutoTrainingService;