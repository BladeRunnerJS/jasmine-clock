import ClockAdaptorClass from './ClockAdaptorClass';

const ClockAdaptor = new ClockAdaptorClass();

export default ClockAdaptor;

export const mockJasmine = {
	clock: () => ClockAdaptor
};
