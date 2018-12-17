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

// usare questo
// node .\convert.js .\karbon-ligth-webfont.woff2 .\karbon-ligth-webfont.woff .\karbon-ligth-webfont.ttf > karbon-ligth.txt
// node .\convert.js .\karbon-regular-webfont.woff2 .\karbon-regular-webfont.woff .\karbon-regular-webfont.ttf > karbon-regular.txt
// node .\convert.js .\karbon-medium-webfont.woff2 .\karbon-medium-webfont.woff .\karbon-medium-webfont.ttf > karbon-medium.txt
// node .\convert.js .\karbon-semibold-webfont.woff2 .\karbon-semibold-webfont.woff .\karbon-semibold-webfont.ttf > karbon-semibold.txt
// node .\convert.js .\karbon-bold-webfont.woff2 .\karbon-bold-webfont.woff .\karbon-bold-webfont.ttf > karbon-bold.txt