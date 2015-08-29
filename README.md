### Hearthstone Statistic
This package will extract the log from hearthstone folder to automaticaly record the your number of win and lost against other hero.

### Version
1.2.5

### Dependencies
1. hearthstone-log-watcher
2. fs
3. events

### Installation
```sh
$ npm install hearthstone-statistic
```

### How to turn on log emitter
1. Locate Hearthstone folder
	- Windows: ```C:\Users\USERNAME\AppData\Local\Blizzard\Hearthstone```
	- Mac: ```USERNAME/Documents/Library/Preferences/Blizzard/Hearthstone```
2. Create a file called "log.config" in that directory
3. Copy and paste the following code to your log.config
	```
	[Zone]
	LogLevel=1
	FilePrinting=false
	ConsolePrinting=true
	ScreenPrinting=false
	```

For reference: https://www.reddit.com/r/hearthstone/comments/268fkk/simple_hearthstone_logging_see_your_complete_play

### How to use hearthstone-statistic
1. Turn on the log emitter 
2. Create a new javascript file (track.js for example)
3. Copy and paste the following code
	```
	var hs = require('hearthstone-statistic');
	hs.run();
    ```
4. Run your js file on your terminal
    ```
    $ node track.js
    ```

5. Play your ordinary Hearthstone game!



### Known Bugs
- First game using a new hero from the data will not be recorded.

### License
MIT
