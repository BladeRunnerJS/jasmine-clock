import sinon from 'sinon';

export default class ClockAdaptorClass {
	
	constructor() {
		this.sinonClock;
	}
	
	isInstalled() {
		return (this.sinonClock !== undefined);
	}
	
	install() {
		let timeNow = new Date().getTime();
		this.sinonClock = sinon.useFakeTimers(timeNow);
	}
	
	uninstall() {
		this.sinonClock.restore();
		this.sinonClock = undefined;
	}
	
	tick(milliseconds) {
		this.sinonClock.tick(milliseconds);
	}
	
}