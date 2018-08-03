/**
 * @file TocAndScrollBehavior test module
 * @copyright Copyright 2016: Thomson Reuters. All Rights Reserved. Proprietary and Confidential information of Thomson Reuters. Disclosure, Use or Reproduction without the written authorization of Thomson Reuters is prohibited.
 */

import $ from 'jquery';
import TocAndScrollBehavior from 'Products/WestlawNext/productViews/plcuk/js/Document/Widget/TocAndScrollBehavior.js';
import Injector from 'Platform/js/di/ModuleInjector.js';
//import * as LocalStorageManager from 'Products/WestlawNext/productViews/plcuk/js/Document/Widget/LocalStorageManager.js';

let sandbox,
	clock,
	localStorageManagerSpy,
	injector = new Injector();


class LocalStorageManagerStub {
	setData() {}
	createLoadingNotation() {}
	removeLoadingNotation() {}
}

QUnit.module('TocAndScrollBehavior', {
	beforeEach: function () {
		sandbox = sinon.sandbox.create();
		clock = sinon.useFakeTimers();
		localStorageManagerSpy = sandbox.spy(LocalStorageManagerStub);
		//injector.rewire(LocalStorageManager, localStorageManagerSpy);
	},
	afterEach: function () {
		sandbox.restore();
		clock.restore();
		//injector.restore();
	}
});

QUnit.test('should be imported correctly', function () {
	ok(TocAndScrollBehavior);
});

QUnit.test('testing create TocAndScrollBehavior', function () {
	var instance = new TocAndScrollBehavior();

	ok((instance instanceof TocAndScrollBehavior), "must be an instance of TocAndScrollBehavior.");
});

QUnit.test('testing "add to localstorage" functionality with modal window appearance', function (assert) {
	const done = assert.async();
	const tocAndScrollBehavior = new TocAndScrollBehavior();
// 	const setDataSpy = sandbox.spy(LocalStorageManagerStub.prototype, 'setData');
// 	const createLoadingNotationSpy = sandbox.spy(LocalStorageManagerStub.prototype, 'createLoadingNotation');
// 	const removeLoadingNotationSpy = sandbox.spy(LocalStorageManagerStub.prototype, 'removeLoadingNotation');

	$("#qunit-fixture").html(`
		<div id='headerContainer'></div>
		<div id='contentContainer'></div>
		<a id='mylink' href='#test'>test</a>`);
	$("#qunit-fixture").on('click', 'a', tocAndScrollBehavior.RetrieveTocLinkClickFunction());
	$("#mylink").click();

 	//ok(true, "LocalStorageManager instance should be created");
// 	// ok(createLoadingNotationSpy.calledOnce, "loadingNotation should be created");
// 	// ok(removeLoadingNotationSpy.notCalled, "loading notation should not be removed while set data will not Spy");

// 	// setTimeout(function () {
// 	// 	ok(setDataSpy.calledOnce, "setDataSpy should be called once");
// 	// 	ok(removeLoadingNotationSpy.called, "remove loadingNotationSpy should be called ");
// 	// 	done();
// 	// }, 1000);

//	clock.tick(1000);

	
});
