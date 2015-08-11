// fs: file system
// npm install fs

var fs = require('fs');

/* functions */

exports.readHistory = function(fileName) {
	fs.readdir('./HS-Stats', function(err, data) {
		if (err) {
			console.log("HS-Stats Directory not exists");
			createDir();
		}
		// HS-Stats directory already exists
		return readFile(fileName);
	});
}


exports.createDir = function() {
	fs.mkdir("./HS-Stats/", function() {
		console.log("Create a new HS-Stats directory.");
	});
}

exports.readFile = function(fileName) {
	fs.readFile('./HS-Stats/' + fileName, 'utf8', function (err, data) {
		if (err){
			// fileName not exists
			createFile();
			return "";
		} else {
			// fileName exists
			console.log(data);
			return data;
		}
	});	
}

exports.createFile = function(fileName) {
	fs.writeFile("./HS-Stats/" + fileName, "", function(err) {
		if (err) throw err;
	});
}

