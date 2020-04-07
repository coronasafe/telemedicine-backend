import Controller from './Controller';
import Logger from '../Helpers/Logger';

export default class HealthController extends Controller {
	/**
	 * check server
	 * @param {*} request
	 */

	/* eslint-disable no-unused-vars */
	checkHealth(request) {
		try {
			Logger.info('All Ok from health api');
			this.sendResponse({ msg: 'ALL OK!' });
		} catch (error) {
			this.handleException(error);
		}
	}
	/* eslint-enable no-unused-vars */
}
