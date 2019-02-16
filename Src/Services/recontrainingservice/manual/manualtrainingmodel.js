function ManualTrainingModel(inputFile, outfile, genfileArray, status, percentage) {
    this.inputFile = inputFile;
    this.outfile = outfile;
    this.genfileArray = genfileArray;    
    this.status = status;
    this.percentage = percentage;
}

ManualTrainingModel.prototype.setGenFiles = function(genfileArray){
    this.genfileArray = genfileArray;
}

ManualTrainingModel.prototype.setStatus = function(status){
    this.status = status;
}

ManualTrainingModel.prototype.setPercentage = function(percentage){
    this.percentage = percentage;
}

module.exports = ManualTrainingModel;