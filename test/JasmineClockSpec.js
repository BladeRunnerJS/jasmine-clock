/* global describe, , beforeEach, afterEach, it */
/*eslint-disable no-unused-vars*/
/*eslint-disable quotes*/
/*eslint-disable no-undef*/
/*eslint-disable no-console*/
'use strict'


import { ClockAdaptor } from '../src/ClockAdaptor.js';
import chai from 'chai';
import sinon from 'sinon';

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
		clock = new ClockAdaptor();
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
	
})