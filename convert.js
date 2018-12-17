var fs = require('fs');

var paramNumber = process.argv.length;
if (paramNumber == 2) {
    console.log("Usage node ./convert.js [woff2] [woff] [ttf]");
    return;
}

file = process.argv[2];
file1 = process.argv[3];
file2 = process.argv[4];

data = fs.readFileSync(file);
data1 = fs.readFileSync(file1);
data2 = fs.readFileSync(file2);

var fileString = '';
fileString = 'url(data:font/woff2;base64,' + data.toString('base64') + '),\n';
fileString += 'url(data:font/woff;base64,' + data1.toString('base64') + '\n),';
fileString += 'url(data:font/ttf;base64,' + data2.toString('base64') + ');';

console.log(fileString);

