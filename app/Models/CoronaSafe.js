/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-return */
/* eslint-disable no-useless-catch */
import rp from 'request-promise';

const credentials = {
	access: '',
	refresh: '',
};
export default class {
	constructor({ username, password }) {
		this.username = username;
		this.password = password;
	}

	async authorize() {
		return new Promise((resolve, reject) => {
			if (credentials.access !== '') {
				resolve('done');
			}
			const options = {
				method: 'POST',
				url: `${process.env.CORONA_API}/api/v1/auth/login/`,
				headers: {
					'Content-Type': 'application/json',
				},
				body: {
					username: this.username,
					password: this.password,
				},
				json: true,
			};
			// eslint-disable-next-line consistent-return
			rp(options)
				.then((data) => {
					credentials.access = data.access;
					credentials.refresh = data.refresh;
					resolve('done');
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	async create(payload) {
		try {
			const options = {
				method: 'POST',
				url: `${process.env.CORONA_API}/api/v1/patient/`,
				headers: {
					Authorization: `Bearer ${credentials.access}`,
					'Content-Type': 'application/json',
				},
				body: payload,
				json: true,
			};
			return rp(options);
		} catch (error) {
			throw error;
		}
	}

	async refresh() {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'POST',
				url: `${process.env.CORONA_API}/api/v1/auth/token/refresh/`,
				headers: {
					'Content-Type': 'application/json',
				},
				body: { refresh: credentials.refresh },
				json: true,
			};
			rp(options)
				.then((data) => {
					credentials.access = data.access;
					credentials.refresh = data.refresh;
					resolve('done');
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	async get(id) {
		const options = {
			method: 'GET',
			url: `${process.env.CORONA_API}/api/v1/patient/${id}`,
			headers: {
				Authorization: `Bearer ${credentials.access}`,
				'Content-Type': 'application/json',
			},
			json: true,
		};
		let count = 0;
		return rp(options)
			.then((data) => data)
			.catch(async (error) => {
				console.log(error);
				count += 1;
				if (count > 3) {
					throw new Error('cannot retrive data');
				}
				await this.refresh();
				return this.get(id);
			});
	}

	async consult(payload) {
		const options = {
			method: 'POST',
			url: `${process.env.CORONA_API}/api/v1/consultation/`,
			headers: {
				Authorization: `Bearer ${credentials.access}`,
				'Content-Type': 'application/json',
			},
			body: payload,
			json: true,
		};
		return rp(options);
	}
}
