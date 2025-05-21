// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
	{
		files: ['**/*.ts'],
		extends: [eslint.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.stylistic, ...angular.configs.tsRecommended],
		processor: angular.processInlineTemplates,
		rules: {
			'prefer-inject-function': 'warn',
			'id-blacklist': ['off'],
			'@typescript-eslint/ban-ts-comment': ['off'],
			'@typescript-eslint/no-explicit-any': ['off'],
			'no-unsafe-optional-chaining': ['off'],
			'@typescript-eslint/no-unused-vars': ['off'],
			'no-mixed-spaces-and-tabs': ['off'],
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: ['enumMember'],
					format: ['UPPER_CASE'],
				},
			],
			'@angular-eslint/component-selector': 'off',
			'@angular-eslint/directive-selector': 'off',
			'@angular-eslint/no-input-rename': 'off',
			'max-len': [
				'error',
				{
					code: 400,
				},
			],
			'no-shadow': 'off',
			'@typescript-eslint/no-shadow': ['error'],
			'@typescript-eslint/explicit-function-return-type': ['off'],
			curly: ['error', 'all'],
		},
	},
	{
		files: ['**/*.html'],
		extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
		rules: {
			'@angular-eslint/template/label-has-associated-control': ['off'],
			'@angular-eslint/template/interactive-supports-focus': ['off'],
			'@angular-eslint/template/elements-content': ['off'],
			'@angular-eslint/template/click-events-have-key-events': ['off'],
		},
	},
);
