/* eslint-disable quote-props */
const questions = {
	en: {
		1: {
			question: 'Are you experiencing Dry Cough?',
			symptom: 'Dry cough',
			subQuestion: 'How severe is your Dry Cough?',
			mild: 1,
			medium: 2,
			high: 3,
		},
		2: {
			question: 'Are you experiencing Sore Throat?',
			symptom: 'Sore Throat',
			subQuestion: 'How severe is your Sore Throat?',
			mild: 1,
			medium: 2,
			high: 3,
		},
		3: {
			question: 'Are you experiencing Weakness ?',
			symptom: 'Weakness',
			subQuestion: 'How severe is your Weakness?',
			mild: 1,
			medium: 2,
			high: 3,
		},
		4: {
			question: 'Are you experiencing Fever ?',
			symptom: 'Fever',
			subQuestion: 'How severe is your Fever?',
			mild: 1,
			medium: 2,
			high: 3,
		},
		5: {
			question: 'Are you experiencing Diarrhoea ?',
			symptom: 'Diarrhoea',
			subQuestion: 'How severe is your Diarrhoea?',
			mild: 1,
			medium: 2,
			high: 3,
		},
		6: {
			question: 'Are you experiencing any kind of breathing difficulty ?',
			symptom: 'Breathing Difficulty',
			subQuestion: 'How severe is your breathing difficulty?',
			mild: 1,
			medium: 2,
			high: 3,
		},
	},
	ml: {
		1: {
			question: 'നിങ്ങൾ വരണ്ട ചുമ അനുഭവിക്കുന്നുണ്ടോ??',
			subQuestion: 'നിങ്ങളുടെ വരണ്ട ചുമ എത്ര കഠിനമാണ്?',
			'ലഘു': 1,
			'ഇടത്തരം': 2,
			'ഉയർന്ന തോതിൽ': 3,
		},
		2: {
			question: 'നിങ്ങൾ തൊണ്ടവേദന അനുഭവിക്കുന്നുണ്ടോ?',
			subQuestion: 'നിങ്ങളുടെ തൊണ്ടവേദന എത്ര കഠിനമാണ്?',
			'ലഘു': 1,
			'ഇടത്തരം': 2,
			'ഉയർന്ന തോതിൽ': 3,
		},
		3: {
			question: 'നിങ്ങൾ ഏതെങ്കിലും തരത്തിലുള്ള ബലഹീനത അനുഭവിക്കുന്നുണ്ടോ?',
			subQuestion: 'നിങ്ങളുടെ ബലഹീനത എത്ര കഠിനമാണ്?',
			'ലഘു': 1,
			'ഇടത്തരം': 2,
			'ഉയർന്ന തോതിൽ': 3,
		},
		4: {
			question: 'നിങ്ങൾക്ക് പനി അനുഭവപ്പെടുന്നുണ്ടോ?',
			subQuestion: 'നിങ്ങളുടെ പനി എത്ര കഠിനമാണ്?',
			'ലഘു': 1,
			'ഇടത്തരം': 2,
			'ഉയർന്ന തോതിൽ': 3,
		},
		5: {
			question: 'നിങ്ങൾക്ക് വയറിളക്കം അനുഭവപ്പെടുന്നുണ്ടോ?',
			subQuestion: 'നിങ്ങളുടെ വയറിളക്കം എത്ര കഠിനമാണ്?',
			'ലഘു': 1,
			'ഇടത്തരം': 2,
			'ഉയർന്ന തോതിൽ': 3,
		},
		6: {
			question: 'നിങ്ങൾക്ക് എന്തെങ്കിലും ശ്വസന ബുദ്ധിമുട്ട് അനുഭവപ്പെടുന്നുണ്ടോ?',
			subQuestion: 'നിങ്ങളുടെ ശ്വസന ബുദ്ധിമുട്ട് എത്ര കഠിനമാണ്?',
			'ലഘു': 1,
			'ഇടത്തരം': 2,
			'ഉയർന്ന തോതിൽ': 3,
		},
	},
};

export default questions;
