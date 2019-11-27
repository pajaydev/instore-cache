'use strict';

class ExpirableCache {
    constructor(options) {
        this._memory = new Map();
        this._callback = (options && options.callback) || (() => { });
    }

    get(key) {
        const cached = this._memory.get(key);
        if (cached) {
            // no expiry is set.
            if (!cached.expiry) return cached.value;
            // check the cached value is not expired.
            if (cached.expiry >= Date.now()) {
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
}

module.exports = ExpirableCache;