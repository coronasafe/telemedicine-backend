/* eslint-disable class-methods-use-this */
import { Bookshelf } from './Model';

class Doctors extends Bookshelf.Model {
	get tableName() {
		return 'doctors';
	}

	get hasTimestamps() {
		return true;
	}
}
export default Bookshelf.model('doctors', Doctors);
