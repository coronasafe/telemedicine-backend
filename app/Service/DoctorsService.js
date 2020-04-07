/* eslint-disable no-useless-catch */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DoctorsRepository from '../Repository/DoctorsRepository';
import AnswerService from './AnswersService';
import CallSchedulerRepository from '../Repository/CallSchedulerRepository';
import CoronaSafe from '../Models/CoronaSafe';

export default class DoctorsService {
  constructor() {
    this.doctor = new DoctorsRepository();
    this.callRequest = new CallSchedulerRepository();
    this.corona = new CoronaSafe({ username: process.env.C_USERNAME, password: process.env.C_PASSWORD });
    this.answer = new AnswerService();
  }

  // create(params) {
  //   params.shift();
  //   const promises = [];
  //   for (let i = 0; i < params.length; i += 1) {
  //     promises.push(this.repo.create(params[i]));
  //   }
  //   return Promise.allSettled(promises);
  // }

  // fetch(language) {
  //   return this.repo.find({ language });
  // }

  async signup(params) {
    params.password = await bcrypt.hash(params.password, 10);
    return this.doctor.create(params);
  }

  async login(params) {
    const doctor = await this.doctor.find({ email: params.email })
      .catch(() => {
        throw new Error('please check email or password');
      });
    const answer = await bcrypt.compare(params.password, doctor.pluck('password')[0]);
    if (answer) {
      const newDoc = doctor.toJSON({ visibility: false });
      delete newDoc[0].password;
      const token = jwt.sign({ parentId: doctor.pluck('id')[0], name: doctor.pluck('name')[0], type: doctor.pluck('doctor')[0] ? 'DOCTOR' : 'IMA_VOLUNTEER' }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return { token, ROLE: doctor.pluck('doctor')[0] ? 'DOCTOR' : 'IMA_VOLUNTEER', userInfo: newDoc };
    }
    throw new Error('Please check email or password');
  }

  async fetchRequests(obj) {
    const { page } = obj;
    delete obj.page;
    await this.corona.authorize();
    let defaultStatus = [];
    let states = [];
    const filter = {};
    if (obj.status === 'All' && obj.type === 'IMA_VOLUNTEER') {
      defaultStatus = ['not_attended', 'closed_by_doctor'];
      filter.volunteer_id = obj.parentId;
      states = ['attending_by_volunteer', 'closed_by_volunteer', 'forwarded_to_doctor'];
    } else if (obj.status === 'All' && obj.type === 'DOCTOR') {
      defaultStatus = ['forwarded_to_doctor'];
      states = ['attending_by_doctor', 'closed_by_doctor'];
      filter.doctor_id = obj.parentId;
    }
    let users = {};
    if (states.length > 0) {
      users = await this.callRequest.findPriority(filter, states, defaultStatus, page);
    } else {
      filter.status = obj.status;
      if (obj.type === 'IMA_VOLUNTEER') filter.volunteer_id = obj.parentId;
      else filter.doctor_id = obj.parentId;
      users = await this.callRequest.find(filter);
    }
    const pagination = users.pagination;
    if (users === null) return { message: 'No new Patients with MEDIUM or HIGH priority' };
    users = users.toJSON({ visibility: false });
    const patients = [];
    let userAnswer = {};
    let biodata = {};
    for (let i = 0; i < users.length; i += 1) {
      userAnswer = await this.answer.fetch(users[i].user_id);
      biodata = await this.corona.get(users[i].user_id);
      if (userAnswer !== null) {
        patients.push({
          patient: {
            name: biodata.name,
            phone: biodata.phone_number,
          },
          ...biodata,
          ...userAnswer,
          request_id: users[i].id,
          status: users[i].status,
          volunteer_name: users[i].volunteer_name,
          created_at: userAnswer.created_at,
          priority: userAnswer.priority,
        });
      } else {
        patients.push({
          patient: {
            name: biodata.name,
            phone: biodata.phone_number,
          },
          ...biodata,
          request_id: users[i].id,
          status: users[i].status,
          volunteer_name: users[i].volunteer_name,
          created_at: users[i].created_at,
          priority: 'HIGH',

        });
      }
    }
    return { entries: patients, ...pagination };
  }

  async updateScheduler({
    status, request_id, parentId, type, name, userId, userNumber,
  }) {
    let obj = {};
    if (type === 'IMA_VOLUNTEER' && (status === 'attending_by_volunteer' || status === 'forwarded_to_doctor' || status === 'closed_by_volunteer')) {
      obj.status = status;
      obj.user_id = userId;
      obj.volunteer_id = parentId;
      obj.volunteer_name = name;
      obj.user_number = userNumber;
      if (status === 'closed_by_volunteer') {
        obj.completed = true;
      }
    } else if (type === 'DOCTOR' && (status === 'attending_by_doctor' || status === 'closed_by_doctor')) {
      obj.status = status;
      obj.doctor_id = parentId;
      if (status === 'closed_by_doctor') {
        obj.completed = true;
      }
    } else {
      throw new Error('Invalid status provided');
    }
    if (request_id === null) {
      await this.callRequest.create(obj);
      return { message: 'Updated Request' };
    }
    await this.callRequest.update(obj, { id: request_id });
    return { message: 'Request has been assigned!' };
  }

  async getAllCounts({ type, parentId }) {
    const obj = {};
    if (type === 'IMA_VOLUNTEER') {
      obj.attending_by_you = await this.callRequest.count({ status: 'attending_by_volunteer', volunteer_id: parentId });
      obj.closed_by_you = await this.callRequest.count({ status: 'closed_by_volunteer', volunteer_id: parentId });
      obj.total_attended_by_you = await this.callRequest.count({ volunteer_id: parentId });
      obj.forwarded_by_you_pending = await this.callRequest.count({ status: 'forwarded_to_doctor', volunteer_id: parentId });
      obj.total_completed_by_you = await this.callRequest.count({ completed: true, volunteer_id: parentId });
    } else if (type === 'DOCTOR') {
      obj.attending_by_you = await this.callRequest.count({ status: 'attending_by_doctor', doctor_id: parentId });
      obj.closed_by_you = await this.callRequest.count({ status: 'closed_by_doctor', doctor_id: parentId });
      obj.total_attended_by_you = await this.callRequest.count({ doctor_id: parentId });
      obj.total_completed_by_you = await this.callRequest.count({ completed: true, doctor_id: parentId });
    }
    obj.total_requests = await this.callRequest.count();
    obj.total_completed = await this.callRequest.count({ completed: true });
    obj.total_not_attended = await this.callRequest.count({ status: 'not_attended' });
    obj.total_forwarded_but_pending = await this.callRequest.count({ status: 'forwarded_to_doctor' });
    return obj;
  }

  async consult(params) {
    const { request_id, parentId } = params;
    delete params.request_id;
    delete params.parentId;
    await this.corona.authorize();
    return this.corona.consult(params)
      .then(async () => {
        await this.callRequest.update({ status: 'closed_by_doctor', doctor_id: parentId, completed: true }, { id: request_id });
      })
      .catch(async () => {
        await this.corona.refresh();
        return this.corona.consult(params);
      });
  }
}
