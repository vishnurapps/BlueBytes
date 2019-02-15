function AutoTrainingModel(inputFile, outfile, status, percentage) {
    this.inputFile = inputFile;
    this.outfile = outfile;
    this.status = status;
    this.percentage = percentage;
}

AutoTrainingModel.prototype.setStatus = function(status){
    this.status = status;
}

AutoTrainingModel.prototype.setPercentage = function(percentage){
    this.percentage = percentage;
}

module.exports = AutoTrainingModel;