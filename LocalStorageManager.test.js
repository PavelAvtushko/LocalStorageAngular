/**
 * @file LocalStorageManager test module
 * @copyright Copyright 2016: Thomson Reuters. All Rights Reserved. Proprietary and Confidential information of Thomson Reuters. Disclosure, Use or Reproduction without the written authorization of Thomson Reuters is prohibited.
 * @formerly none
 */

import $ from 'jquery';
import LocalStorageManager from 'Products/WestlawNext/productViews/plcuk/js/Document/Widget/LocalStorageManager.js';
import Injector from 'Platform/js/di/ModuleInjector.js';
import * as LocalStorage from 'Platform/js/Website/Widgets/LocalStorage.js';

let LS_Manager,
	sandbox,
	injector = new Injector(),
	localStorageStub = {
		storage: {},
		setItem: function (key, value) {
			this.storage[key] = value || '';
		},
		getItem: function (key) {
			return key in this.storage ? this.storage[key] : null;
		}
	};

QUnit.module('LocalStorageManager', {
	beforeEach: function () {
		const dataID = 'Testing';
		sandbox = sinon.sandbox.create();
		injector.rewire(LocalStorage, localStorageStub);
		LS_Manager = new LocalStorageManager(dataID);
	},
	afterEach: function () {
		sandbox.restore();
		injector.restore();
		localStorageStub.storage = {};
	}
});

QUnit.test('should not create instance without parameters', function () {
	const getItemSpy = sandbox.spy(localStorageStub, 'getItem');

	throws(() => new LocalStorageManager(), "should throws error");
	ok(!getItemSpy.called, "should call getItem from localStorage in constructor");
});

QUnit.test('should not create instance without string-type parameter', function () {
	const testData = [1, {}, () => {}, null, undefined, NaN, true];
	const getItemSpy = sandbox.spy(localStorageStub, 'getItem');

	testData.map((item) => {
		throws(() => new LocalStorageManager(item), "should throws error");
	});
	ok(getItemSpy.notCalled, "should call getItem from localStorage in constructor");

});

QUnit.test('should set and store data', function () {
	const testkey1 = 'key1';
	const testValue1 = 'value1';
	const testkey2 = 'key2';
	const testValue2 = 1;

	LS_Manager.setData(testkey1, testValue1);
	LS_Manager.setData(testkey2, testValue2);

	ok(LS_Manager.data[testkey1] === testValue1 && LS_Manager.data[testkey2] === testValue2, "the data should be set to the localstorage");
});

QUnit.test('should remove all data and update localstorage', function () {
	const spy = sandbox.spy(LS_Manager, "_update");
	const testkey1 = 'key1';
	const testValue1 = 'value1';

	LS_Manager.setData(testkey1, testValue1);
	LS_Manager.delete();

	ok(!LS_Manager.data[testkey1] && !Object.keys(LS_Manager.data).length, "data storage should be empty");
	ok(spy.calledTwice, "update method should be called twice");
});

QUnit.test('should get data', function () {
	const testkey1 = 'key1';
	const testValue1 = 'value1';

	LS_Manager.setData(testkey1, testValue1);

	ok(!LS_Manager.getData(), "the data should not be gotten");
	ok(LS_Manager.getData(testkey1) === testValue1, "the data should be gotten from the localstorage");
});


QUnit.test('should set data to the localstorage using update method', function () {
	const testkey1 = 'key1';
	const testValue1 = 'value1';
	const setItemSpy = sandbox.spy(localStorageStub, 'setItem');

	LS_Manager.setData(testkey1, testValue1);

	ok(setItemSpy.calledOnce, "setItem method was called");
});


QUnit.test('should create and remove alert message DOM-element', function () {
	let selector = '#qunit-fixture';
	let text = 'test';
	let className = 'test-class';

	equal($(selector).find('.' + className).length, 0, "DOM shouldn't contains alert message");

	//add alert message to DOM
	const test_message = LS_Manager.createLoadingNotation(selector, text, className);

	equal($(selector).find('.' + className).length, 1, "DOM should contains alert message");

	//remove alert message from DOM
	LS_Manager.removeLoadingNotation(test_message);

	equal($(selector).find('.' + className).length, 0, "shouldn't contains alert message DOM-element after removing");
});
