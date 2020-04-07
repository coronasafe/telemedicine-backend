/**
 * app configuration
 */
import dotenv from 'dotenv';

dotenv.config();

export default function () {
	process.project = {
		app: {
			key: process.env.APP_KEY,
			env: process.env.APP_ENV,
			name: process.env.APP_NAME,
			port: process.env.APP_PORT,
		},

		log: {
			level: process.env.LOG_LEVEL || 'debug',
			file: process.env.LOG_FILE || 'app',
		},

		db: {
			connection: process.env.DB_CONNECTION,
			database: process.env.DB_DATABASE,
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		},
	};
}
