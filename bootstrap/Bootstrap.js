/**
 * module for intializing all service required by app
 */

import Mysql from './Initializers/mysql';
import Logger from '../app/Helpers/Logger';

export default class Bootstrap {
	static intializeServices() {
		const promiseStack = [];

		// checks if mysql connection required by app
		if (process.project.db.connection === 'mysql') {
			const mysqlPromise = new Promise((resolve, reject) => {
				const mysql = new Mysql();
				mysql.connection
					.raw('select 1+1 as result')
					.then(() => {
						resolve(mysql.connection);
					})
					.catch((error) => {
						Logger.error(error);
						reject(
							new Error(
								'Unable to create connection with mysql, please make sure mysql server is running.',
							),
						);
					});
			});
			promiseStack.push(mysqlPromise);
		}
		return promiseStack;
	}
}
