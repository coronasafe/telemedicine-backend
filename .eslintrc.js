module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: ['airbnb-base'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
		'implicit-arrow-linebreak': ['off', 'below'],
		'object-curly-newline': ['off'],
	},
};
