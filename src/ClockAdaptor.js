import sinon from 'sinon';

export class ClockAdaptor {
	
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
	
}

const ClockAdaptorInstance = new ClockAdaptor();
export default ClockAdaptorInstance;