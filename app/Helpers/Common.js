// eslint-disable-next-line import/prefer-default-export
export function generateOTP() {
	const digits = '9123456789';
	let OTP = '';
	for (let i = 0; i < 4; i += 1) {
		OTP += digits[Math.floor(Math.random() * 10)];
	}
	return OTP;
}
