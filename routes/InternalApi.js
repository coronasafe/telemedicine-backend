import express from 'express';
import DoctorController from '../app/Controllers/DoctorsController';

const InternalRouter = express.Router();

InternalRouter.post('/doctor/signup', (request, response) => {
	const controller = new DoctorController(response);
	controller.signup(request);
});

export default InternalRouter;
