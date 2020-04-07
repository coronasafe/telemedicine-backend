import Controller from './Controller';
import Validator from '../Validators/Validator';
import AccountService from '../Service/AccountService';
import DoctorsService from '../Service/DoctorsService';
import Logger from '../Helpers/Logger';


export default class AccountController extends Controller {
	constructor(response) {
		super(response);
		this.userService = new AccountService();
		this.doctorService = new DoctorsService();
	}

	async sendOTP({ query }) {
		try {
			const number = query.phone;
			Logger.info(`Sending otp for number ${number}`);
			this.userService.sendOTP(query.phone)
				.then(() => {
					this.sendResponse({ message: 'OTP SEND' });
				})
				.catch((error) => {
					this.handleException(error);
				});
		} catch (error) {
			this.handleException(error);
		}
	}

	async verifyOTP({ query }) {
		try {
			Logger.info('verifying OTP');
			const params = this.validateParams(query, Validator.user.verify);
			this.userService.verifyOTP(params)
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

	async update({ body }) {
		try {
			Logger.info('updating new user in coronasafeDb');
			const params = this.validateParams(body, Validator.user.update);
			this.userService.update(params)
				.then((data) => {
					Logger.info('Updated user in coronasafeDb');
					this.sendResponse(data);
				})
				.catch((error) => {
					this.handleException(error);
				});
		} catch (error) {
			this.handleException(error);
		}
	}

	async getAllUsers({ parentId }) {
		this.userService.getAllUsers(parentId)
			.then((data) => {
				this.sendResponse(data);
			})
			.catch((error) => {
				this.handleException(error);
			});
	}

	async login({ body }) {
		const params = this.validateParams(body, Validator.doctors.login);
		this.doctorService.login(params)
			.then((data) => {
				this.sendResponse(data);
			})
			.catch((error) => {
				this.handleException(error);
			});
	}

	async scheduleCall({ query, type, parentId }) {
		const params = this.validateParams(query, Validator.user.call);
		if (type === 'USER') {
			Logger.info(`Scheduling call for ${parentId}`);
			params.parentId = parentId;
			params.status = 'not_attended';
		} else if (type === 'IMA_VOLUNTEER') {
			Logger.info(`Scheduling call for ${params.parentId}`);
			params.volunteer_id = parentId;
			params.status = 'attending_by_volunteer';
		}
		this.userService.scheduleCall(params)
			.then((data) => {
				this.sendResponse(data);
			})
			.catch((error) => {
				this.handleException(error);
			});
	}
}
