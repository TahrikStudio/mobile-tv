1. Download SDK manager. Place in /home/user/Development
2. Install build tools and platform tools using sdk/bin/sdkmanager
3. Ensure gradle is installed

# Debugging using weinre
1. Serve application using phonegap
```
$ npm install -g phonegap
$ phonegap serve
```

2. Install and run weinre with machine IP.
```
$ npm install -g weinre
$ weinre --boundHost 192.168.1.70 --httpPort 8080
```

3. Inject debug script in `www/index.html`.
```
<script src="http://192.168.1.70:8080/target/target-script-min.js#anonymous">
```

4. Download Phonegap Developer App on mobile and connect to app served by phonegap in step 1.

5. Open debug console in browser using IP and Port number given with weinre

# Points to Ponder
- cordova-promose-polyfill plugin may be required for making AJAX calls