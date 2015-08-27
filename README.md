### Hearthstone Statistic
This package will extract the log from hearthstone folder to automaticaly record the your number of win and lost against other hero.

### Version
1.2.2

### Dependencies
1. hearthstone-log-watcher
2. fs
3. events

### Installation
```sh
npm install hearthstone-statistic
```

### How to use
1. Create a new javascript file (track.js for example)
2. Copy and paste the following code
	```js
    var hs = require('hearthstone-statistic');
    hs.run();
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
