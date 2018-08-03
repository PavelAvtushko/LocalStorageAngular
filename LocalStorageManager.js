import LocalStorage from 'Platform/js/Website/Widgets/LocalStorage.js';

export default class LocalStorageManager {
    constructor(key) {
        if (!key || typeof key !== 'string') {
            throw new Error('require key parameter');
        }
        this.key = key;
        this.data = JSON.parse(LocalStorage.getItem(this.key)) || {};
    }

    _update() {
        LocalStorage.setItem(this.key, JSON.stringify(this.data));
    }

    setData(key, value) {
        if (this.data[key] && this.data[key] === value) {
            return;
        }
        this.data[key] = value;
        this._update();
        return this;
    }

    getData(key) {
        return this.data[key] ? this.data[key] : null;
    }

    delete() {
        this.data = {};
        this._update();
        return this;
    }
}
