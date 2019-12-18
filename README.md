# instore-cache

node module to cache instore.

- - -
### Install.
```sh
npm install instore-cache

# yarn 
yarn add instore-cache

```
### Looking to cache access token your application.

You can use `expirable-cache` which caches until the time exceeds the expiry time.

```javascript
const { expirableCache } = require('instore-cache');
expirableCache.set('SAMPLE_KEY_EXPIRY', "121241323qweerttyysdf", 10);
expirableCache.get('SAMPLE_KEY_EXPIRY');
```
### Features

  * you can specify the expiration time and provide the callback which calls after time has been expired.

