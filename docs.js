// fs: file system
// npm install fs

var fs = require('fs');

/* functions */

exports.readHistory = function(fileName) {
	fs.readdir('./HS-Stats', function(err, data) {
		if (err) {
			createDir();
		}
		// not returning anything here as fs will return undefined
	});

	// HS-Stats directory already exists
	return readFile(fileName);
}


exports.createDir = function() {
	fs.mkdirSync("./HS-Stats/");
}

exports.readFile = function(fileName) {
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

exports.createFile = function(fileName, content) {
	if (typeof content === 'undefined') {
		content = "";
	}

	fs.writeFileSync("./HS-Stats/" + fileName, content);
}

exports.appendFile = function(fileName, content) {
	if (typeof content === 'undefined') {
		content = "";
	}
	fs.appendFileSync("./HS-Stats/" + fileName, content);
}