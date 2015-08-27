var LogWatcher = require('hearthstone-log-watcher');
var logWatcher = new LogWatcher();

var docs = require('./docs');

var player = new docs.Player("FRIENDLY");
var opp = new docs.Player("OPPONENT");

// this part is not neccessary to save the record - just to see the cards movement
logWatcher.on('zone-change', function (data) {
	if (data.zone === 'PLAY (Hero)') {
		if (data.team === 'FRIENDLY') {
	  		player.hero(data.cardName);
	  		console.log(data.cardName + ' - ' + data.team);
	  	} else {
	  		opp.hero(data.cardName);
	  		console.log(data.cardName + ' - ' + data.team);
	  	}
	}
});

logWatcher.on('game-over', function(players) {
	// to avoid recursion of new game
	if (players.length != 0) {
		if (players[0].status === 'WON') {
			// our hero loses
			docs.updateHeroWinRate(player.outputHero(), opp.outputHero(), "L");
		} else {
			// our hero wins
			docs.updateHeroWinRate(player.outputHero(), opp.outputHero(), "W");
		}
	}
	player = new docs.Player("FRIENDLY");
	opp = new docs.Player("OPPONENT");
});

logWatcher.start();