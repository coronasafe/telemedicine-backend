import Controller from './Controller';
// import Validator from '../Validators/Validator';
// import CallService from '../Service/CallService';
import Logger from '../Helpers/Logger';

export default class CallController extends Controller {
	// constructor(response) {
	//   super(response);
	//   // this.service = new CallService();
	// }

	async get({ query }) {
		try {
			Logger.info(query);
			// this.service.submit(params)
			//   .then((data) => {
			//     this.sendResponse(data);
			//   })
			//   .catch((error) => {
			//     this.handleException(error);
			//   });
		} catch (error) {
			this.handleException(error);
		}
	}
}
