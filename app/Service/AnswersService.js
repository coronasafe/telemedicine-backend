import AnswersRepository from '../Repository/AnswersRepository';
import questions from '../constants/Questions';

function getKeyByValue(object, value) {
	return Object.keys(object).find((key) => object[key] === value);
}

export default class AnswersService {
	constructor() {
		this.repo = new AnswersRepository();
	}

	async submit(params) {
		const obj = {};
		params.answers = JSON.stringify(params.answers);
		if (params.score < 8) params.priority = 'LOW';
		else if (params.score > 8 && params.score < 12) params.priority = 'MEDIUM';
		else params.priority = 'HIGH';
		await this.repo.create(params);
		obj.score = params.score;
		if (params.score > 6 && params.score < 10) {
			obj.priority = 'Medium';
			obj.doctorName = 'Dr. Abraham george';
			obj.doctoNumber = '049-542-69859';
		} else if (params.score <= 6) {
			obj.priority = 'Low';
			obj.tips = {
				tip1: 'wash your hands',
				tip2: 'Go out only if necessary',
				tip3: 'update status on app daily',
			};
		} else {
			obj.priority = 'HIGH';
			obj.message = 'I HAVE NO IDEA';
		}
		return obj;
	}

	async fetch(id) {
		let answers = await this.repo.getLatest({ id });
		if (answers === null) {
			return null;
		}
		answers = answers.toJSON({ visibility: false });
		const { score, priority, created_at } = answers;
		answers = JSON.parse(answers.answers);
		const keys = Object.keys(answers);
		// const values = Object.values(answers);
		const obj = {};
		let q;
		let a;
		for (let i = 0; i < keys.length; i += 1) {
			q = questions['en'][keys[i]].symptom;
			a = getKeyByValue(
				questions['en'][keys[i]],
				questions['en'][keys[i]][answers[keys[i]]],
			);
			obj[q] = a;
		}
		return {
			symptoms: obj,
			score,
			priority,
			created_at,
		};
	}
}
