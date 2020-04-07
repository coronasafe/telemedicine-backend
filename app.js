import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';

import Config from './config/config';
import Routes from './routes/routes';
import Boostrap from './bootstrap/Bootstrap';
import Logger from './app/Helpers/Logger';
import isAuthenticated from './app/Middlewares/Isauthenticated';

// loads config and env variables in process
Config();
const app = express();

// security middleware
app.use(helmet());

// maximum request size limit middleware
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

app.use('/api/authorize', cors());
app.use('/api/authorize', Routes.AccountRouter);

app.use('/api/user', [cors(), isAuthenticated]);
app.use('/api/user', Routes.AccountRouter);

app.use('/api/answers', [cors(), isAuthenticated]);
app.use('/api/answers', Routes.AnswersRouter);

app.use('/api/doctors', [cors(), isAuthenticated]);
app.use('/api/doctors', Routes.DoctorsRouter);
app.use('/api/questions', cors());
app.use('/api/questions', Routes.QuestionsRouter);

app.use('/internal', Routes.InternalRouter);

app.use('/api/call', Routes.CallRouter);

/**
 * uncaught exception handling
 */
process.on('uncaughtException', (reason) => {
	Logger.error('uncaughtException', new Error(reason));
});

// initalizing global required services and creating server
Promise.all(Boostrap.intializeServices())
	.then(() => {
		app.listen(process.project.app.port, () => {
			Logger.info('Server Started Successfully');
		});
	})
	.catch((error) => {
		Logger.error('BoostrapInitiailizeServices', new Error(error));
	});
