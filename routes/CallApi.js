import express from 'express';
import CallController from '../app/Controllers/CallController';

const CallRouter = express.Router();

CallRouter.get('/get', (request, response) => {
	const controller = new CallController(response);
	controller.get(request);
});

export default CallRouter;
