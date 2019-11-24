'use strict';

class MemoryLite {
    constructor(options) {
        this._memory = new Map();
        this._callback = options.callback || (() => { });
    }

    noop() {
        () => { }
    }
    get(key) {
        const cached = this._memory.get(key);
        if (cached) {
            // check the cached value is not expired.
            if (cached.expiry > Date.now()) {
                return cached.value;
            } else {
                // delete the key;
                this._callback();
            }
        }

    }

    set() {

    }

    remove(key) {
        if (key) {
            this._memory.delete(key);
        }
    }
}

new MemoryLite();