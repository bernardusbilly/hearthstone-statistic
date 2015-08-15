var LogWatcher = require('hearthstone-log-watcher');
var logWatcher = new LogWatcher();

var doc = require('./docs');

var player = new Player("FRIENDLY");
var opp = new Player("OPPONENT");

logWatcher.on('zone-change', function (data) {
	if (data.zone === 'PLAY (Hero)') {
		if (data.team === 'FRIENDLY') {
	  		player.hero(data.cardName);
	  		console.log("(" + data.cardName + ') has moved to (' + data.team + ') (' + data.zone + ')');
	  	} else {
	  		opp.hero(data.cardName);
	  		console.log("(" + data.cardName + ') has moved to (' + data.team + ') (' + data.zone + ')');
	  	}
	}
});
 
logWatcher.on('game-over', function(players) {

	if (players[0].status === 'WON') {
		// player 0 won
		if (players[0].team === 'FRIENDLY') {
			console.log("Win.");
		} else {
			console.log("Lost.");
		}

	} else {
		// player 1 won
		if (players[1].team === 'FRIENDLY') {
			console.log("Win.");
		} else {
			console.log("Lost.");
		}
	}

	/*players.forEach(function(player) {
		if (player.status === 'WON') {
			console.log("The Winner is %s", player.name);
		}
	})*/
	player = new Player("FRIENDLY");
	opp = new Player("OPPONENT");
});

logWatcher.start();

function Player(status) {
	this.status = status;
	this.lib = {
		"Rexxar": "Hunter",
		"Garrosh Hellscream": "Warrior",
		"Jaina Proudmore": "Mage",
		"Uther Lightbringer": "Paladin",
		"Thrall": "Shaman",
		"Anduin Wyrnn": "Priest",
		"Valeera Sanguinar": "Rogue",
		"Gul'dan": "Warlock"
	}

	this.hero = function(heroName) {
		this.hero = this.lib[heroName];
	}

	this.winner = function() {
		return this.hero;
	}
}


/**
 	Finds the number of win and lose in ourHeroName.txt with associated enemyHeroName

	@param: (string)ourHeroName, (string)enemyHeroName
	@return: the number of win and lose in array of integer
*/
function searchHeroWinRate(ourHeroName, enemyHeroName) {
	var a = readHistory("Hunter.txt");
	var b = a.split("\n");
	var c = b[0].split(" ");
	var d = c[0];
	var e = parseInt(c[1]);

	var text = docs.readHistory(ourHeroName + ".txt");
	var found = false;
	var lines = text.split("\n");
	var rtn;

	for(var i = 0; i < lines.length; i++) {
		var hero = lines[i][0];
		if (ourHeroName == hero) {
			found = true;
			rtn = [parseInt(lines[i][1]), parseInt(lines[i][2])];
		}
	}

	if (found == true) {

	}
}