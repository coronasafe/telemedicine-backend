import Controller from './Controller';
import Logger from '../Helpers/Logger';

export default class HealthController extends Controller {
	/**
	 * check server
	 * @param {*} request
	 */

	checkHealth() {
		try {
			Logger.info('All Ok from health api');
			this.sendResponse({ msg: 'ALL OK!' });
		} catch (error) {
			this.handleException(error);
		}
	}
}
