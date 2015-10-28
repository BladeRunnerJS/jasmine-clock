/* global describe, , beforeEach, afterEach, it */
/*eslint-disable no-unused-vars*/
/*eslint-disable quotes*/
/*eslint-disable no-undef*/
/*eslint-disable no-console*/
'use strict'


import ClockAdaptorClass from '../src/ClockAdaptorClass.js';
import chai from 'chai';

const expect = chai.expect;

describe("Jasmine Clock", () => {
	
	const global = Function('return this')() || (42, eval)('this');
	var clock;
	
	/* xxxImmediate functions are also replaced by Sinon if they exist
		include them here to ensure we put the whole environment back to it's original state */
	const originalGlobals = {
		setTimeout: setTimeout,
		clearTimeout: clearTimeout,
		setImmediate: setImmediate,
		clearImmediate: clearImmediate,
		setInterval: setInterval,
		clearInterval: clearInterval,
		Date: Date
	}
	
	beforeEach(() => {
		clock = new ClockAdaptorClass();
	})
	
	afterEach(() => {
		for (var funcName in originalGlobals) {
			global[funcName] = originalGlobals[funcName];
		}
	});
	
	it("can be installed", () => {
		clock.install();
		
		expect(setTimeout).not.to.be.eq(originalGlobals.setTimeout);
		expect(clearTimeout).not.to.be.eq(originalGlobals.setTimeout);
		expect(setInterval).not.to.be.eq(originalGlobals.setTimeout);
		expect(clearInterval).not.to.be.eq(originalGlobals.setTimeout);
		expect(Date).not.to.be.eq(originalGlobals.Date);		
		expect(clock.isInstalled()).to.be.true;
	});
	
	it("can be uninstalled", () => {
		clock.install();
		
		expect(setTimeout).not.to.be.equal(originalGlobals.setTimeout);
		expect(clearTimeout).not.to.be.equal(originalGlobals.clearTimeout);
		expect(setInterval).not.to.be.equal(originalGlobals.setInterval);
		expect(clearInterval).not.to.be.equal(originalGlobals.clearInterval);
		expect(Date).not.to.be.equal(originalGlobals.Date);
		expect(clock.isInstalled()).to.be.true;
		
		clock.uninstall();
		
		expect(setTimeout).to.be.equal(originalGlobals.setTimeout);
		expect(clearTimeout).to.be.equal(originalGlobals.clearTimeout);
		expect(setInterval).to.be.equal(originalGlobals.setInterval);
		expect(clearInterval).to.be.equal(originalGlobals.clearInterval);
		expect(Date).to.be.equal(originalGlobals.Date);
		expect(clock.isInstalled()).to.be.false;
	});
	
	it("can use tick with setTimeout", () => {
		clock.install();
		let timeoutCalled = false;
		
		setTimeout(() => {
			timeoutCalled = true;
		}, 10);
		
		expect(timeoutCalled).to.be.false;
		
		clock.tick(5);
		expect(timeoutCalled).to.be.false;
		
		clock.tick(4);
		expect(timeoutCalled).to.be.false;
		
		clock.tick(1);
		expect(timeoutCalled).to.be.true;
	});
	
	it("can clear timeouts", () => {
		clock.install();
		let timeoutCalled = false;
		
		let timeout = setTimeout(() => {
			timeoutCalled = true;
		}, 10);
		
		clearTimeout(timeout);
		
		clock.tick(10);
		expect(timeoutCalled).to.be.false;
	});
	
	it("can use tick with setInterval", () => {
		clock.install();
		let intervalCallCount = 0;
		
		setInterval(() => {
			intervalCallCount++;
		}, 10);
		
		expect(intervalCallCount).to.be.eq(0);
		
		clock.tick(5);
		expect(intervalCallCount).to.be.eq(0);
		
		clock.tick(5);
		expect(intervalCallCount).to.be.eq(1);
		
		clock.tick(20);
		expect(intervalCallCount).to.be.eq(3);
	});
	
	it("can clear intervals", () => {
		clock.install();
		let intervalCallCount = 0;
		
		let interval = setInterval(() => {
			intervalCallCount++;
		}, 10);
		
		expect(intervalCallCount).to.equal(0);
		
		clearInterval(interval);
		clock.tick(20);
		
		expect(intervalCallCount).to.be.eq(0);
	});
	
	it("replaces Date object", () => {
		clock.install();
		
		let initialTime = new Date().getTime();
		
		clock.tick(5);
		
		expect(new Date().getTime()).to.equal(initialTime+5);
		
		clock.tick(65);
		
		expect(new Date().getTime()).to.equal(initialTime+70);
	});
	
})