var 		fs = require('fs');
var		events = require('events');
var LogWatcher = require('hearthstone-log-watcher');

var logWatcher = new LogWatcher();
var eventEmitter = new events.EventEmitter();

exports.run = function() {
	var player = new Player("FRIENDLY");
	var opp = new Player("OPPONENT");

	logWatcher.on('zone-change', function (data) {
		if (data.zone === 'PLAY (Hero)') {
			if (data.team === 'FRIENDLY') {
		  		player.inputHero(data.cardName);
		  		console.log(data.cardName + ' - ' + data.team);
		  	} else {
		  		opp.inputHero(data.cardName);
		  		console.log(data.cardName + ' - ' + data.team);
		  	}
		}
	});

	logWatcher.on('game-over', function(players) {
		// to avoid recursion of new game
		if (players.length != 0) {
			if (players[0].status === 'WON') {
				// our hero loses
				updateHeroWinRate(player.outputHero(), opp.outputHero(), "L");
			} else {
				// our hero wins
				updateHeroWinRate(player.outputHero(), opp.outputHero(), "W");
			}
		}
		player = new Player("FRIENDLY");
		opp = new Player("OPPONENT");
	});

	logWatcher.start();
}

/**
 	Finds the number of win and lose in ourHeroName.txt with associated enemyHeroName, then update the
 	winning rate of that particular hero with corresponding enemyHero

	@param: (string)ourHeroName, (string)enemyHeroName, (string)"W" or "L" to indicate win or lose
	@return: nothing
*/
function updateHeroWinRate(ourHeroName, enemyHeroName, condition) {
	var text = readHistory(ourHeroName + ".txt");
	var lines = text.split("\n");
	var found = false;

	for(var i = 0; i < lines.length; i++) {
		var hero = lines[i].split(" ")[0];
		var win = 0;
		var lost = 0;
		var newRow;
		var newText;
		if (enemyHeroName == hero) {
			found = true;
			// update the data with corresponding condition
			if (condition == "W") {
				win = parseInt(lines[i].split(" ")[1]) + 1;
				lost = parseInt(lines[i].split(" ")[2]);
				newRow = [enemyHeroName, win, lost].join(" ");
				lines[i] = newRow;
				newText = lines.join("\n");
				createFile(ourHeroName + ".txt", newText);
			} else {
				// lose condition
				win = parseInt(lines[i].split(" ")[1])
				lost = parseInt(lines[i].split(" ")[2]) + 1;
				newRow = [enemyHeroName, win, lost].join(" ");
				lines[i] = newRow;
				newText = lines.join("\n");
				createFile(ourHeroName + ".txt", newText);
			}
		}

		// last recursion
		if (i == lines.length-1) {
			eventEmitter.emit("heroFound");
		}
	}

	eventEmitter.on("heroFound", function() {
		// if record was never made
		if (found == false) {
			if (condition == "W") {
				appendFile(ourHeroName + ".txt", enemyHeroName + " 1 0\n");	
			} else {
				appendFile(ourHeroName + ".txt", enemyHeroName + " 0 1\n");
			}
		}
	});
}

/* 
	Player object to record the hero that the current player chooses

	@param: (string)FRIENDLY or OPPONENT
*/

function Player(status) {
	this.status = status;
	this.lib = {
		"Rexxar": "Hunter",
		"Alleria Windrunner": "Hunter",
		"Garrosh Hellscream": "Warrior",
		"Magni Bronzebeard": "Warrior",
		"Jaina Proudmoore": "Mage",
		"Medivh": "Mage",
		"Uther Lightbringer": "Paladin",
		"Thrall": "Shaman",
		"Anduin Wrynn": "Priest",
		"Valeera Sanguinar": "Rogue",
		"Gul'dan": "Warlock",
		"Malfurion Stormrage": "Druid"
	}

	// saves the hero's class
	this.inputHero = function(heroName) {
		this.hero = this.lib[heroName];
	}

	// returns the hero's class
	this.outputHero = function() {
		return this.hero;
	}
}

/* Filesystem extension functions */

function readHistory(fileName) {
	fs.readdir('./data', function(err, data) {
		if (err) {
			createDir();
		}
		// not returning anything here as fs will return undefined
	});

	// data directory already exists
	return readFile(fileName);
}


function createDir() {
	fs.mkdirSync("./data/");
}

function readFile(fileName) {
	try {
		return fs.readFileSync('./data/' + fileName, 'utf8');
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

	fs.writeFileSync("./data/" + fileName, content);
}

function appendFile(fileName, content) {
	if (typeof content === 'undefined') {
		content = "";
	}
	fs.appendFileSync("./data/" + fileName, content);
	console.log("Log recorded.");
}

function createFile(fileName, content) {
	if (typeof content === 'undefined') {
		content = "";
	}

	fs.writeFileSync("./data/" + fileName, content);
}