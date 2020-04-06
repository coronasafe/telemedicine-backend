/* eslint-disable class-methods-use-this */
import { Bookshelf } from './Model';

class Answers extends Bookshelf.Model {
  get tableName() {
    return 'answers';
  }

  get hasTimestamps() {
    return true;
  }
}
export default Bookshelf.model('answers', Answers);
