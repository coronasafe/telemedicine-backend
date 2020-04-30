import Controller from './Controller';
import Validator from '../Validators/Validator';
import AnswersService from '../Service/AnswersService';
import Logger from '../Helpers/Logger';

export default class AnswersController extends Controller {
	constructor(response) {
		super(response);
		this.service = new AnswersService();
	}

	async submit({ body, parentId }) {
		try {
			Logger.info(`Submiting answer for ${parentId}`);
			const params = this.validateParams(body, Validator.answers.submit);
			params.parent_id = parentId;
			this.service
				.submit(params)
				.then((data) => {
					this.sendResponse(data);
				})
				.catch((error) => {
					this.handleException(error);
				});
		} catch (error) {
			this.handleException(error);
		}
	}
}
