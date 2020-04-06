/* eslint-disable class-methods-use-this */
import { Bookshelf } from './Model';

class callScheduler extends Bookshelf.Model {
  get tableName() {
    return 'call_scheduler';
  }

  get hasTimestamps() {
    return true;
  }
}

export default Bookshelf.model('call_scheduler', callScheduler);
