/* eslint-disable class-methods-use-this */
import { Bookshelf } from './Model';

class UserProfile extends Bookshelf.Model {
	get tableName() {
		return 'user_profile';
	}

	get hasTimestamps() {
		return true;
	}

	get softDelete() {
		return ['deleted_at'];
	}
}
export default Bookshelf.model('user_profile', UserProfile);
