// import parse from 'csv-parse';
// import fs from 'fs';
import Controller from './Controller';
import Validator from '../Validators/Validator';

import DoctorsService from '../Service/DoctorsService';
import { request } from 'express';
// import Logger from '../Helpers/Logger';


export default class DoctorsController extends Controller {
  constructor(response) {
    super(response);
    this.service = new DoctorsService();
  }

  // async submit() {
  //   try {
  //     const csvrows = [];
  //     let errors = [];
  //     let success = 0;
  //     fs.createReadStream('./storage/uploads/doc.csv')
  //       .pipe(parse({ delimiter: ',', columns: ['name', 'phone'] }))
  //       .on('data', (csvrow) => {
  //         try {
  //           const params = this.validateParams(csvrow, Validator.doctors.insert);
  //           csvrows.push(params);
  //           success += 1;
  //         } catch (error) {
  //           errors.push(csvrow);
  //         }
  //       })
  //       .on('end', () => {
  //         fs.unlinkSync('./storage/uploads/doc.csv');
  //         this.service.create(csvrows)
  //           .then(() => {
  //             this.sendResponse({ message: 'created', errors });
  //           })
  //           .catch((error) => {
  //             this.handleException(error);
  //           });
  //       });

  //     // const params = this.validateParams(body, Validator.Doctors.submit);
  //     // params.parent_id = parentId;
  //     // this.service.submit(params)
  //     //   .then(() => {
  //     //     this.sendResponse({ message: 'Answer submitted' });
  //     //   })
  //     //   .catch((error) => {
  //     //     this.handleException(error);
  //     //   });
  //   } catch (error) {
  //     this.handleException(error);
  //   }
  // }

  async signup({ body }) {
    const params = this.validateParams(body, Validator.doctors.signup);
    this.service.signup(params)
      .then(() => {
        this.sendResponse({ messgae: 'created doc' });
      })
      .catch((error) => {
        this.handleException(error);
      });
  }

  async fetchRequests({ query, type, parentId, districtId }) {
    if (type === 'IMA_VOLUNTEER' || type === 'DOCTOR') {
      this.service.fetchRequests({ ...query, type, parentId, districtId })
        .then((data) => {
          this.sendResponse(data);
        })
        .catch((error) => {
          this.handleException(error);
        });
    }
  }

  async update({ query, type, parentId, name, districtId }) {
    const params = this.validateParams(query, Validator.doctors.update);
    if (!params.request_id) params.request_id = null;
    params.parentId = parentId;
    params.type = type;
    params.name = name;
    params.districtId = districtId;
    this.service.updateScheduler(params)
      .then((data) => {
        this.sendResponse(data);
      })
      .catch((error) => {
        this.handleException(error);
      });
  }

  async count({ type, parentId }) {
    this.service.getAllCounts({ type, parentId })
      .then((data) => {
        this.sendResponse(data);
      })
      .catch((error) => {
        this.handleException(error);
      });
  }

  async consult({ type, body, parentId }) {
    const params = this.validateParams(body, Validator.doctors.consult);
    if (params.category === null) delete params.category;
    params.parentId = parentId;
    params.facility = 214;
    if (type === 'DOCTOR') {
      this.service.consult(params)
        .then((data) => {
          this.sendResponse(data);
        })
        .catch((error) => {
          this.handleException(error);
        });
    } else {
      this.handleException(new Error('Unauthorized'));
    }
  }
}
