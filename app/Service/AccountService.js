/* eslint-disable no-useless-catch */
/* eslint-disable class-methods-use-this */
import rp from 'request-promise';
import jwt from 'jsonwebtoken';
import { generateOTP } from '../Helpers/Common';
import TempOtpRepository from '../Repository/TempOtpRepository';
import UseProfileRepository from '../Repository/UserProfileRepository';
import CallSchedulerRepository from '../Repository/CallSchedulerRepository';
import AnswerRepository from '../Repository/AnswersRepository';
import CoronaSafe from '../Models/CoronaSafe';
import Logger from '../Helpers/Logger';

export default class AccountService {
	constructor() {
		// this.repository = new AccountRepository();
		this.otp = new TempOtpRepository();
		this.user = new UseProfileRepository();
		this.schedule = new CallSchedulerRepository();
		this.corona = new CoronaSafe({ username: 'surekhsha_test', password: 'Mark42!rockz' });
		this.answer = new AnswerRepository();
	}

	async sendOTP(number) {
		try {
			const otp = generateOTP();
			const options = {
				method: 'POST',
				url: `https://${process.env.EXOTEL_APP_KEY}:${process.env.EXOTEL_APP_TOKEN}@api.exotel.com/v1/Accounts/techlytx1/Sms/send`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				form: {
					From: '09513886363',
					To: number,
					Priority: 'High',
					Body: `This is a test message being sent using Exotel with a (${otp}) and (123). If this is being abused, report to 08088919888`,
				},
			};
			await rp(options);
			return this.otp.update({ number, otp });
		} catch (error) {
			throw error;
		}
	}

	async verifyOTP({ otp, number }) {
		try {
			await this.corona.authorize();
			await this.otp.find({ otp, number })
				.catch((error) => {
					throw error;
				});
			let user = await this.user.find({ phone_number: number, primary: true });
			const token = jwt.sign({ parentId: number, type: 'user', name: 'USER', districtId: 'NONE' }, process.env.JWT_SECRET, { expiresIn: '7d' });
			if (user === null) {
				return { access_token: token, role: 'USER' };
			}
			user = user.toJSON({ visibility: false });
			let count = 0;
			user = await this.corona.get(user.id)
				.catch(async (error) => {
					count = +1;
					if (count > 3) {
						throw error;
					}
					await this.corona.authorize();
					return this.corona.get(user.id);
				});
			return { access_token: token, role: 'USER', userInfo: user };
		} catch (error) {
			Logger.error(error);
			return { message: 'WRONG OTP' };
		}
	}

	async update(obj, count = 0) {
		try {
			const params = { ...obj };
			const { primary } = params;
			delete params.primary;
			await this.corona.authorize();
			const keys = Object.keys(params.medical_history);
			const medicalHistory = [];
			for (let i = 0; i < keys.length; i += 1) {
				if (params.medical_history[keys[i]]) {
					medicalHistory.push({
						disease: keys[i],
					});
				}
			}
			params.medical_history = medicalHistory;
			params.disease_status = 'NEGATIVE';
			return this.corona.create(params)
				.then((data) => {
					const {
						id, district, state,
					} = data;
					params.id = id;
					this.user.create({
						phone_number: data.phone_number,
						id,
						district,
						local_body: data.local_body,
						state,
						primary,
					});
					return data;
				})
				.catch(async (error) => {
					Logger.error(error);
					count += 1;
					if (count > 5) {
						throw new Error('failed to create user');
					}
					await this.corona.refresh();
					return this.update(obj, count);
				});
		} catch (error) {
			throw error;
		}
	}

	async getAllUsers(parentId) {
		await this.corona.authorize();
		const users = await this.user.findAll({ phone_number: parentId });
		if (users === null) throw new Error(`unable to finder user for  ${parentId}`);
		const userId = users.pluck('id');
		const dbUsers = [];
		for (let i = 0; i < userId.length; i += 1) {
			dbUsers.push(this.corona.get(userId[i]));
		}
		return Promise.all(dbUsers);
	}

	async scheduleCall(params) {
		const user = await this.answer.getLatest({ id: params.id });
		const userProfile = await this.user.find({ id: params.id });
		if (user === null) return { message: 'User not found' };
		const obj = { user_id: params.id, user_number: params.parentId, district_id: userProfile.get('district') };
		if (params.status) obj.status = params.status;
		await this.schedule.create(obj);
		return { message: 'Volunteer has been notified and will get back to you as soon as possible' };
	}
}
