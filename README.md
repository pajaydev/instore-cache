# instore-cache

node module to cache instore.

- - -
### Install.
```sh
npm install instore-cache

# yarn 
yarn add instore-cache

```
### Looking to cache access token in your application ?.

You can use `expirable-cache` which caches until the time exceeds the expiry time.

```javascript
const { expirableCache } = require('instore-cache');
const expirableCache = new ExpirableCache(options);
expirableCache.set('SAMPLE_KEY_EXPIRY', "121241323qweerttyysdf", 10);
expirableCache.get('SAMPLE_KEY_EXPIRY');
```

### options
```json
{
  "expireTime":5000, // expiry time above which the record will be removed.
  "callback": "any function to call when the time exceeds expiry time"
} 
```
### Features

  * you can specify the expiration time and provide the callback which calls after time has been expired.

