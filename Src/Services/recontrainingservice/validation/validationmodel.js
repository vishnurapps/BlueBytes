function ValidationModel(inputFile, outFile, genfile, status, percentage) {
    this.inputFile = inputFile;
    this.outfile = outFile;
    this.genfile = genfile;
    this.status = status;
    this.percentage = percentage;    
}

ValidationModel.prototype.setGenFile = function(genfile){
    this.genfile = genfile;
}

ValidationModel.prototype.setStatus = function(status){
    this.status = status;
}

ValidationModel.prototype.setPercentage = function(percentage){
    this.percentage = percentage;
}

module.exports = ValidationModel;