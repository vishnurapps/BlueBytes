const Util = require('../serviceutil.js')
const AutoTrainingModel = require('./autotrainingmodel.js');

module.inputFiles = new Array();
module.outputFiles = new Array();

function AutoTrainingService(){
    // Read the fileUrls from both input and output folders
    this.inputFiles = Util.getResourceFiles(Util.AUTO_MODE_IN_FOLDER);
    this.outputFiles = Util.getResourceFiles(Util.AUTO_MODE_OUT_FOLDER);
}

/**
 * Register Auto Training
 */
AutoTrainingService.prototype.registerAutoTraining = function(app){
    app.get('/auto', function (req, res) {      
        // Loop through each Training images (input and output) ans send to client as callbacks
        for(let index = 0; index < this.inputFiles.length; index++){
          let percentage = ((index + 1)/this.inputFiles.length) * 100;
          let status = (percentage == 100) ? "Pending" : "Done";
          var autoModel = new AutoTrainingModel(
                            Util.getFileUrl(Util.AUTO_MODE_IN_FOLDER + '/' + this.inputFiles[index]),
                            Util.getFileUrl(Util.AUTO_MODE_OUT_FOLDER + '/' + this.outputFiles[index]),
                            status, percentage);
      
          res.write(JSON.stringify(autoModel));
        }  
        res.end();
    });
}

module.exports = AutoTrainingService;