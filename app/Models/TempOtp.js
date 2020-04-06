/* eslint-disable class-methods-use-this */
import { Bookshelf } from './Model';

class TempOtp extends Bookshelf.Model {
  get tableName() {
    return 'temp_otp';
  }

  get hasTimestamps() {
    return true;
  }
}
export default Bookshelf.model('temp_otp', TempOtp);
