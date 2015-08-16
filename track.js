var LogWatcher = require('hearthstone-log-watcher');
var logWatcher = new LogWatcher();

var docs = require('./docs');

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
	// player can be in player[0] or player[1]
	if (players[0].status === 'WON') {
		// player 0 won
		updateHeroWinRate(player.outputHero(), opp.outputHero(), "L");
	} else {
		// player 1 won
		updateHeroWinRate(player.outputHero(), opp.outputHero(), "W");
	}
	player = new Player("FRIENDLY");
	opp = new Player("OPPONENT");
});

logWatcher.start();

function Player(status) {
	this.status = status;
	this.lib = {
		"Rexxar": "Hunter",
		"Garrosh Hellscream": "Warrior",
		"Jaina Proudmoore": "Mage",
		"Uther Lightbringer": "Paladin",
		"Thrall": "Shaman",
		"Anduin Wrynn": "Priest",
		"Valeera Sanguinar": "Rogue",
		"Gul'dan": "Warlock",
		"Malfurion Stormrage": "Druid"
	}

	this.hero = function(heroName) {
		this.hero = this.lib[heroName];
	}

	this.outputHero = function() {
		return this.hero;
	}
}


/**
 	Finds the number of win and lose in ourHeroName.txt with associated enemyHeroName, then update the
 	winning rate of that particular hero with corresponding enemyHero

	@param: (string)ourHeroName, (string)enemyHeroName, (string)"W" or "L" to indicate win or lose
	@return: nothing
*/
function updateHeroWinRate(ourHeroName, enemyHeroName, condition) {
	var text = docs.readHistory(ourHeroName + ".txt");
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
				docs.createFile(ourHeroName + ".txt", newText);
			} else {
				// lose condition
				win = parseInt(lines[i].split(" ")[1])
				lost = parseInt(lines[i].split(" ")[2]) + 1;
				newRow = [enemyHeroName, win, lost].join(" ");
				console.log(newRow);
				lines[i] = newRow;
				newText = lines.join("\n");
				docs.createFile(ourHeroName + ".txt", newText);
			}
		}
	}

	// if record was never made
	if (found == false) {
		if (condition == "W") {
			docs.appendFile(ourHeroName + ".txt", enemyHeroName + " 1 0\n");	
		} else {
			docs.appendFile(ourHeroName + ".txt", enemyHeroName + " 0 1\n");
		}
	}
}