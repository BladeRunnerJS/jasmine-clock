/* global describe, , beforeEach, afterEach, it */
/*eslint-disable no-unused-vars*/
/*eslint-disable quotes*/
/*eslint-disable no-undef*/
/*eslint-disable no-console*/

/* While these tests duplicate what's in 'JasmineClockSpec' they are intended to ensure that the API is exaclty the same as the Jasmine API by using the tests copied directly from the Jasmine documentation. So the tests don't need to be changed the various Jasmine specific testing methods have been created to proxy through to Sinon */

import { mockJasmine } from '../src/ClockAdaptor.js';
import chai from 'chai';
import sinon from 'sinon';

const expect = chai.expect;

/* start creating Jasmine mock environment */
const jasmine = {
	createSpy: () => {
		let spy = sinon.spy();
		spy.calls = {
			count: () => {
				return spy.callCount;
			}
		};
		return spy;
	},
	clock: mockJasmine.clock
};
const Assertion = chai.Assertion;
Assertion.addMethod('toHaveBeenCalled', function () {
	this.assert(
		this._obj.called
		, 'expected #{this} to have been called'
		, 'expected #{this} to not have been called'
	);
});
Assertion.addMethod('toEqual', function (val) {
	this.assert(
		this._obj === val
		, 'expected #{this} to have been called'
		, 'expected #{this} to not have been called'
	);
});
/* end mock environment */


// Jasmine Clock example tests taken from https://jasmine.github.io/2.0/introduction.html#section-Mocking_the_JavaScript_Timeout_Functions

describe("Manually ticking the Jasmine Clock", function() {
	var timerCallback;

	beforeEach(function() {
		timerCallback = jasmine.createSpy("timerCallback");
		jasmine.clock().install();
	});

	afterEach(function() {
		jasmine.clock().uninstall();
	});

	it("causes a timeout to be called synchronously", function() {
		setTimeout(function() {
			timerCallback();
		}, 100);

		expect(timerCallback).not.toHaveBeenCalled();

		jasmine.clock().tick(101);

		expect(timerCallback).toHaveBeenCalled();
	});

	it("causes an interval to be called synchronously", function() {
		setInterval(function() {
			timerCallback();
		}, 100);

		expect(timerCallback).not.toHaveBeenCalled();

		jasmine.clock().tick(101);
		expect(timerCallback.calls.count()).toEqual(1);

		jasmine.clock().tick(50);
		expect(timerCallback.calls.count()).toEqual(1);

		jasmine.clock().tick(50);
		expect(timerCallback.calls.count()).toEqual(2);
	});
});
