import express from 'express';
import QuestionsController from '../app/Controllers/QuestionsController';

const QuestionsRouter = express.Router();

QuestionsRouter.post('/create', (request, response) => {
	const controller = new QuestionsController(response);
	controller.create(request);
});

QuestionsRouter.get('/fetch', (request, response) => {
	const controller = new QuestionsController(response);
	controller.fetch(request);
});

QuestionsRouter.get('/zgWuZoU743XKtLkm', (request, response) => {
	// console.log(request.query);
	response.status(200).send('9074631410');
});

export default QuestionsRouter;
