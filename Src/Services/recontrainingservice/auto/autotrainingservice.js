const Util = require('../serviceutil.js')
const AutoTrainingModel = require('./autotrainingmodel.js');

function AutoTrainingService(){
}

/**
 * Register Auto Training
 */
AutoTrainingService.prototype.registerAutoTraining = function(app){
    app.get('/autotraining', function (req, res) {
        // Read the files from both input and output folders
        const inputFiles = Util.getResourceFiles(Util.AUTO_MODE_IN_FOLDER);
        const outputFiles = Util.getResourceFiles(Util.AUTO_MODE_OUT_FOLDER);
      
        // 1. Find and send each Training images (input and output)
        for(let index = 0; index < inputFiles.length; index++){
          let percentage = ((index + 1)/inputFiles.length) * 100;
          let status = (percentage == 100) ? "Pending" : "Done";
          var autoModel = new AutoTrainingModel(
                            Util.getFileUrl(Util.AUTO_MODE_IN_FOLDER + '/' + inputFiles[index]),
                            Util.getFileUrl(Util.AUTO_MODE_OUT_FOLDER + '/' + outputFiles[index]),
                            status, percentage);
      
          res.write(JSON.stringify(autoModel));
        }  
        res.end();
    });
}

module.exports = AutoTrainingService;