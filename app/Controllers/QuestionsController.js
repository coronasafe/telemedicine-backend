
import Controller from './Controller';
import questions from '../constants/Questions';
import Logger from '../Helpers/Logger';

export default class QuestionsController extends Controller {
	fetch({ query }) {
		Logger.info('Fetching questions');
		this.sendResponse(questions[query.language]);
	}
}
