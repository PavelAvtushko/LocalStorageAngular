import ModuleContext from './ModuleContext.js';

var instance;

/**
 * Constructor, singleton.
 */
function Injector() {
	if (!instance) {
		this._context = new ModuleContext();
		instance = this;
	}

	return instance;
}

/**
 * Rewire a module.
 * @param {*} module Original module.
 * @param {*|string} exportName Stub module or exported name (for named exports).
 * @param {*|string} [stub] Stub module (for named exports).
 */
Injector.prototype.rewire = function (module, exportName, stub) {
	this._context.addStub(module);
	var rewire;
	var isDefaultExport = true;

	if (!stub) {
		stub = exportName;
		rewire = module.rewire;
	} else {
		rewire = module[`rewire$${exportName}`];
		isDefaultExport = false;
	}

	if (rewire) {
		rewire(stub);
	} else {
		if (isDefaultExport) {
			throw new Error("[INJECTOR]: 'rewire' export wasn't found in rewired module, you probably going to stub a named export.");
		} else {
			throw new Error(`[INJECTOR]: 'rewire$${exportName}' export wasn't found in rewired module, check the 'exportName' parameter.`);
		}
	}

	return this;
};

/**
 * Restore original modules that were rewired in the scope of the injector.
 */
Injector.prototype.restore = function () {
	this._context.getStubs().forEach(module => {
		module.restore();
	});
	this._context.reset();
};


export default Injector;
