function ValidationModel(inputFile, genfile, outFile, status) {
    this.inputFile = inputFile;
    this.genfile = genfile;
    this.outfile = outFile;
    this.status = status;
}

ValidationModel.prototype.setStatus = function(status){
    this.status = status;
}

module.exports = ValidationModel;