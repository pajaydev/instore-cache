'use strict';

/**
     * This function stores the value in inmemory, we can specify the time the 
     * stored value is going to expire and call a callback.
     * Mostly this function is used when you want to store the token for a particular time
     * and regenerate the token when its expired.
     *
     * @function
     * @name ExpirableCache
     *
     * @param {object} [options] - options passed to function
     * @param {object} [options.expireTime] - to set the expiry time globally
     * @param {function} [options.callback] - callback will be executed when the value is expired.
     *
*/
class ExpirableCache {
    constructor(options) {
        this._memory = new Map();
        // set the expiry time.
        this.setExpiryTime(options && options.expireTime);
        this._callback = (options && options.callback) || (() => { });
    }

    get(key) {
        const cached = this._memory.get(key);
        if (cached) {
            // no expiry is set.
            if (!cached.expiry && !this._expTm) return cached.value;
            const expireTime = cached.expiry || this._expTm;
            // check the cached value is not expired.
            if (expireTime >= Date.now()) {
                return cached.value;
            } else {
                // delete the key and call the callback;
                this._callback();
            }
        }

    }

    set(key, value, expiryTm) {
        // set the value in memory
        this._memory.set(key, {
            value,
            expiry: expiryTm && (expiryTm + Date.now())
        });
    }

    remove(key) {
        if (key) {
            this._memory.delete(key);
        }
    }

    removeAll() {
        // reset the object.
        this._memory = new Map();
    }

    size() {
        return this._memory.size;
    }

    setExpiryTime(time) {
        this._expTm = time ? time + Date.now() : null;
    }
}

module.exports = ExpirableCache;