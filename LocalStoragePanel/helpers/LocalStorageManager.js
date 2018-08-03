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
        if (!this.data[key]) {
            return new Promise((res) => {
                setTimeout(() => {
                    this.data[key] = value;
                    this._update();
                    res(this.data);
                }, 1000);
            });
        }
        return new Promise.resolve(this.data);
    }

    getDataByKey(key) {
        return new Promise((res) => {
            setTimeout(() => {
                const data = this.data[key] ? this.data[key] : null;
                res(data);
            }, 1000);
        });
    }

    getData() {
        return new Promise((res) => {
            setTimeout(() => {
                res(this.data);
            }, 1000);
        });
    }

    clearAll() {
        for (let key in this.data) {
            delete this.data[key];
        }
        this._update();
    }

    removeItemByKey(key) {
        delete this.data[key];
        this._update();
    }
}