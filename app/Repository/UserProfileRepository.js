/* eslint-disable class-methods-use-this */
import UserProfile from '../Models/UserProfile';

export default class QuestionsRepository {
	find(obj) {
		try {
			return UserProfile.query((qb) => {
				qb.whereNotNull('local_body').where(obj);
			})
				.fetch({ require: true })
				.catch(() => null);
		} catch (error) {
			return null;
		}
	}

	findExists(obj) {
		return UserProfile.where(obj)
			.fetch({ require: true })
			.catch(() => null);
	}

	findAll(obj) {
		return UserProfile.where(obj)
			.fetchAll({ require: true })
			.catch(() => null);
	}

	create(obj) {
		return new UserProfile().save(obj);
	}

	update(updateObj, obj) {
		return UserProfile.query((qb) => {
			qb.update(updateObj).where(obj);
		})
			.fetch()
			.catch(() => new UserProfile({ ...updateObj, ...obj }).save());
	}
}
