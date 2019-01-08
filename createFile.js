var fs = require('fs');
const fontFolder = './fonts/';
const destFile = './fonts-base64.css';

var fontName = 'Lato';
var baseType = 'url(data:font/';
var oldFileName = '';
var base64String = '';

fs.exists(destFile, function (exists) {
    if (exists) {
        fs.unlinkSync(destFile);
    }
});

fs.readdir(fontFolder, (err, files) => {
    files.forEach((file, i) => {

        var fileFullName = file;
        var fileName = getFilename(fileFullName);

        if (oldFileName === '') {
            oldFileName = fileName;
        }

        if (fileName !== oldFileName || i == files.length - 1) {

            if (i === (files.length - 1)) {
                base64String = createBase64(fileFullName);
            }

            var fontBase = '@font-face { \n';
            fontBase += '\tfont-family: "' + fontName + '";\n';
            fontBase += '\tfont-weight: ' + getFontWeight(oldFileName) + ';\n';
            fontBase += '\tfont-style: normal;\n';
            fontBase += '\tsrc: \n';
            fontBase += base64String.substring(0, base64String.length - 2) + ';\n';
            fontBase += '}\n';

            // console.log(fontBase);

            //write to file
            fs.appendFileSync(destFile, fontBase);

            // console.log('---');

            oldFileName = fileName;
            base64String = '';
        }

        base64String = createBase64(fileFullName);
    });
});

console.log("Done.");

// create base64 encoding
function createBase64(fileFullName) {
    var fileExt = getExtension(fileFullName).toUpperCase();
    var dataType = baseType + fileExt.toLowerCase();
    var fileData = fs.readFileSync(fontFolder + fileFullName);
    base64String += '\t\t' + dataType + ';\nbase64,' + fileData.toString('base64') + '),\n';
    return base64String;
}

// get file extension
function getExtension(filename) {
    return filename.split('.').pop();
}

// get file name
function getFilename(filename) {
    return filename.split('.').shift();
}

// get fontWeight
function getFontWeight(fileName) {

    if (fileName.indexOf("regular") != -1) {
        return 'normal';
    }

    if (fileName.indexOf("black") != -1) {
        return 'bolder';
    }

    if (fileName.indexOf("bold") != -1) {
        return 'bold';
    }

    if (fileName.indexOf("light") != -1) {
        return 'lighter';
    }

    return '';
}