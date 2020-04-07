/* eslint-disable class-methods-use-this */
import Answers from '../Models/Answers';

export default class AnswersRepository {
	find(obj) {
		return Answers.where(obj).fetchAll();
	}

	getLatest(obj = {}) {
		return Answers.where(obj)
			.orderBy('created_at', 'desc')
			.query((qb) => {
				qb.limit(1);
			})
			.fetch()
			.catch(() => null);
	}

	create(obj) {
		return new Answers().save(obj);
	}
}
