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
			console.log('Win.');
		} else {
			console.log('Lost.');
		}
	} else {
		// player 1 won
		if (players[1].team === 'FRIENDLY') {
			console.log('Win.');
		} else {
			console.log('Lost.');
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
}