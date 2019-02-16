const fs = require('fs');
const url = require('url');

// Host and Port
const HOST_NAME = "localhost";
exports.HOST_NAME = HOST_NAME;
const PORT = 5002;
exports.PORT = PORT;

// Public Resource folders
const PUBLIC_RESOURCE_FOLDER = "/TestData";
exports.PUBLIC_RESOURCE_FOLDER = PUBLIC_RESOURCE_FOLDER;
const PUBLIC_RESOURCE_FULL_PATH = require('path').join(__dirname, PUBLIC_RESOURCE_FOLDER);
exports.PUBLIC_RESOURCE_FULL_PATH = PUBLIC_RESOURCE_FULL_PATH;

// URL String


exports.AUTO_MODE_IN_FOLDER = "/auto/input";
exports.AUTO_MODE_OUT_FOLDER = "/auto/output";

exports.MANUAL_MODE_IN_FOLDER = "/manual/input";
exports.MANUAL_MODE_OUT_FOLDER = "/manual/output";
exports.MANUAL_MODE_GEN_FOLDER = "/manual/gen";

exports.VALIDATION_MODE_IN_FOLDER = "/validation/input";
exports.VALIDATION_MODE_OUT_FOLDER = "/validation/output";
exports.VALIDATION_MODE_GEN_FOLDER = "/validation/gen";

exports.STATUS_PENDING = "PENDING";
exports.STATUS_PROGRESS = "PROGRESS";
exports.STATUS_COMPLETED = "COMPLETED";

function getFullFilePath(relativePath){
    return require('path').join(PUBLIC_RESOURCE_FULL_PATH, relativePath);
}
exports.getFullFilePath = getFullFilePath;
  
function getFileUrl(relativePath){
    return url.parse('http://' + HOST_NAME + ':' + PORT + '/' + relativePath).href;
}
exports.getFileUrl = getFileUrl;

function getResourceFiles(parentFolder){
    return fs.readdirSync(getFullFilePath(parentFolder))
}
exports.getResourceFiles = getResourceFiles;