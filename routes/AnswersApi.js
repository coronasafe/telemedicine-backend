import express from 'express';
import AnswersController from '../app/Controllers/AnswersController';

const AnswersRouter = express.Router();

AnswersRouter.post('/submit', (request, response) => {
	const controller = new AnswersController(response);
	controller.submit(request);
});

export default AnswersRouter;
