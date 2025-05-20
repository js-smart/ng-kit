// @ts-check
const tseslint = require('typescript-eslint');
const rootConfig = require('../../eslint.config.js');

module.exports = tseslint.config(
	...rootConfig,
	{
		files: ['**/*.ts'],
		rules: {
			'@angular-eslint/prefer-on-push-component-change-detection': 'error',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/explicit-function-return-type': 'error',
		},
	},
	{
		files: ['**/*.html'],
		rules: { '@angular-eslint/template/no-negated-async': 'error' },
	},
);
