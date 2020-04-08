/* eslint-disable class-methods-use-this */
import Logger from '../Helpers/Logger';

export default class Contoller {
	constructor(response) {
		this.response = response;
	}

	validateParams(params, validationSchema) {
		if (validationSchema) {
			const { error, value } = validationSchema.validate(params);
			if (error) {
				throw error;
			}
			return value;
		}

		return null;
	}

	/**
	 * common method for sending success response
	 * @param {*} data
	 */
	sendResponse(data) {
		this.response.status(200).json({
			data,
		});
	}

	/**
	 * method for handling exceptions
	 * @param {*} error
	 */
	handleException(error) {
		let name = {};
		if (error.sql) {
			name = 'DbException';
		} else {
			name = error.name;
		}
		this.response.status(401).json({
			error: name,
		});
		Logger.error(error);
	}
}
