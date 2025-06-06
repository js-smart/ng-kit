// @ts-check
const tseslint = require('typescript-eslint');
const rootConfig = require('../../eslint.config.js');

module.exports = tseslint.config(
	...rootConfig,
	{
		files: ['**/*.ts'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/explicit-function-return-type': 'warn',
		},
	},
	{
		files: ['**/*.html'],
		rules: { '@angular-eslint/template/no-negated-async': 'error' },
	},
);
