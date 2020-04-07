import express from 'express';
import QuestionsController from '../app/Controllers/QuestionsController';

const InternalRouter = express.Router();

InternalRouter.post('/create', (request, response) => {
	const controller = new QuestionsController(response);
	controller.create(request);
});

export default InternalRouter;
