/* eslint-disable class-methods-use-this */
import CallScheduler from '../Models/CallScheduler';

const pageSize = 8;

export default class CallSchedulerRepository {
	find(obj, page) {
		return CallScheduler.where(obj).fetchPage({ page, pageSize });
	}

	findPriority(obj, states, defaultStatus, page) {
		return CallScheduler.query((qb) => {
			qb.where('status', 'IN', states)
				.where(obj)
				.orWhere('status', 'IN', defaultStatus)
				.andWhere({ district_id: obj.district_id });
		})
			.orderBy('updated_at', 'desc')
			.fetchPage({ page, pageSize });
	}

	create(obj) {
		return CallScheduler.where(obj)
			.fetch({ withDeleted: true })
			.catch(() => new CallScheduler().save(obj));
	}

	update(updateObj, obj) {
		return CallScheduler.query((qb) => {
			qb.update(updateObj).where(obj);
		})
			.fetch()
			.catch(() => new CallScheduler({ ...updateObj, ...obj }).save());
	}

	count(obj) {
		if (obj === undefined) {
			return CallScheduler.count();
		}
		return CallScheduler.where(obj).count();
	}
}
