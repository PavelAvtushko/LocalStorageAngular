export default class ModuleContext {
    constructor() {
        this._stubs = [];
    }

    addStub(module) {
        this._stubs.push(module);
    }

    getStubs() {
        return this._stubs;
    }

    reset() {
        this._stubs = [];
    }
}
