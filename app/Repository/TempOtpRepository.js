/* eslint-disable class-methods-use-this */
import TempOtp from '../Models/TempOtp';

export default class TempOtpRepository {
	find(obj) {
		return TempOtp.where(obj).fetch();
	}

	update({ number, otp }) {
		return TempOtp.where({ number })
			.fetch()
			.then((tempOtp) => {
				if (tempOtp) {
					tempOtp.set({ otp });
					tempOtp.save();
				}
			})
			.catch(() => new TempOtp({ number, otp }).save());
	}
}
