const fs = require('fs');
const url = require('url');

// Host and Port
const HOST_NAME = "192.168.3.167";
exports.HOST_NAME = HOST_NAME;
const PORT = 5003;
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

exports.STATUS_NONE = "NONE";
exports.STATUS_PENDING = "PENDING";
exports.STATUS_PROGRESS = "PROGRESS";
exports.STATUS_COMPLETED = "COMPLETED";

function getFullFilePath(relativePath){
    return require('path').join(PUBLIC_RESOURCE_FULL_PATH, relativePath);
}
exports.getFullFilePath = getFullFilePath;
  
function getFileUrl(relativePath){
    console.log(relativePath);
    return url.parse('http://' + HOST_NAME + ':' + PORT + '/' + relativePath).href;
}
exports.getFileUrl = getFileUrl;

function getResourceFiles(parentFolder){
    // Read the list of files after forming the full file path
    return fs.readdirSync(getFullFilePath(parentFolder))
}
exports.getResourceFiles = getResourceFiles;

function getResourceFileUrls(parentFolder){
    // Read the list of files after forming the full file path
    var files = fs.readdirSync(getFullFilePath(parentFolder))
    var resoucefileUrls = new Array();

    // Loop through and creating file urls (appending http://hostname:port/parentFolder/filename)
    for(let index = 0; index < files.length; index++){
        resoucefileUrls[index] = getFileUrl(parentFolder + '/' + files[index]);
        console.log(resoucefileUrls[index]);
    }
    return resoucefileUrls;
}
exports.getResourceFileUrls = getResourceFileUrls;