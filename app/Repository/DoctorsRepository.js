/* eslint-disable no-useless-catch */
/* eslint-disable class-methods-use-this */
import Doctors from '../Models/Doctors';

export default class DoctorsRepository {
  find(obj) {
    return Doctors.where(obj).fetchAll({ require: true });
  }

  create(obj) {
    return new Doctors().save(obj);
  }
}
