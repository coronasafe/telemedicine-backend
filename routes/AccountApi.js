import express from 'express';
import AccountController from '../app/Controllers/AccountController';

const AccountRouter = express.Router();

AccountRouter.get('/otp/send', (request, response) => {
  const controller = new AccountController(response);
  controller.sendOTP(request);
});

AccountRouter.get('/otp/verify', (request, response) => {
  const controller = new AccountController(response);
  controller.verifyOTP(request);
});

AccountRouter.post('/login', (request, response) => {
  const controller = new AccountController(response);
  controller.login(request);
});

AccountRouter.post('/update', (request, response) => {
  const controller = new AccountController(response);
  controller.update(request);
});

AccountRouter.get('/all/get', (request, response) => {
  const controller = new AccountController(response);
  controller.getAllUsers(request);
});

AccountRouter.get('/schedule', (request, response) => {
  const controller = new AccountController(response);
  controller.scheduleCall(request);
});


export default AccountRouter;
