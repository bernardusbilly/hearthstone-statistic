# Hearthstone Statistic
This package will extract the log from hearthstone folder to automaticaly record the your number of win and lost against other hero.

### Version
1.1

### Dependencies
hearthstone-log-watcher

### Installation
```sh
$ npm install hearthstone-log-watcher
```

### How to use
1. Create a new javascript file (track.js for example)
2. Copy and paste the following code
    ```js
    var LogWatcher = require('hearthstone-log-watcher');
    var logWatcher = new LogWatcher();

    var hsDoc = require('hearthstone-statistic');

    var player = new hsDoc.Player("FRIENDLY");
    var opp = new hsDoc.Player("OPPONENT"); 
    
    logWatcher.on('game-over', function(players) {
    	// to avoid recursion of new game
        if (players.length != 0) {
	        if (players[0].status === 'WON') {
		        // our hero loses
		        hsDoc.updateHeroWinRate(player.outputHero(), opp.outputHero(), "L");
            } else {
		        // our hero wins
		        hsDoc.updateHeroWinRate(player.outputHero(), opp.outputHero(), "W");
	        }
        }
        player = new hsDoc.Player("FRIENDLY");
        opp = new hsDoc.Player("OPPONENT");
    });

    logWatcher.start();
    ```
3. Run your js file on your terminal
    ```js
    $ node track.js
    ```

4. Play your ordinary Hearthstone game!

### Known Bugs
- First game using a new hero from the data will not be recorded.

### License
MIT
