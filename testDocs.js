// fs: file system
// npm install fs

var fs = require('fs');

//var hist = readHistory("statistic.txt");
// console.log(readHistory("statistic.txt"));

console.log(readHistory("stats.txt"));

/* functions */

function readHistory(fileName) {
	fs.readdir('./HS-Stats', function(err, data) {
		if (err) {
			createDir();
		}
		// not returning anything here as fs will return undefined
	});

	// HS-Stats directory already exists
	return readFile(fileName);
}


function createDir() {
	fs.mkdirSync("./HS-Stats/");
}

function readFile(fileName) {
	try {
		return fs.readFileSync('./HS-Stats/' + fileName, 'utf8');
	} catch (e) {
		if (e.code === 'ENOENT') {
		  	console.log("File not found: " + " creating " + fileName + " file.");
		  	setTimeout(function() {
				createFile(fileName, "");
			}, 100);
			return "";
		} else {
			throw e;	
		}
	}
}

function createFile(fileName, content) {
	if (typeof content === 'undefined') {
		content = "";
	}

	fs.writeFileSync("./HS-Stats/" + fileName, content);
}

