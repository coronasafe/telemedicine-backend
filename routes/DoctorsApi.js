import express from 'express';
// import multer from 'multer';

import DoctorsController from '../app/Controllers/DoctorsController';

// const csvStorage = multer.diskStorage({
//   destination: './storage/uploads',
//   filename(_request, file, callback) {
//     callback(null, 'doc.csv');
//   },
// });
// const uploadCsv = multer({ storage: csvStorage });

const DoctorsRouter = express.Router();

// DoctorsRouter.post('/submit',
// uploadCsv.fields([{ name: 'csv', maxCount: 7 }]), (request, response) => {
//   const controller = new DoctorsController(response);
//   controller.submit(request);
// });

DoctorsRouter.post('/signup', (request, response) => {
	const controller = new DoctorsController(response);
	controller.signup(request);
});

DoctorsRouter.get('/requests/fetch', (request, response) => {
	const controller = new DoctorsController(response);
	controller.fetchRequests(request);
});

DoctorsRouter.get('/requests/update', (request, response) => {
	const controller = new DoctorsController(response);
	controller.update(request);
});

DoctorsRouter.get('/requests/count', (request, response) => {
	const controller = new DoctorsController(response);
	controller.count(request);
});

DoctorsRouter.post('/requests/consultation', (request, response) => {
	const controller = new DoctorsController(response);
	controller.consult(request);
});

export default DoctorsRouter;
