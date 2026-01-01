import { NgDocConfiguration } from '@ng-doc/builder';

const config: NgDocConfiguration = {
	cache: true,
	repoConfig: {
		url: 'https://github.com/js-smart/ng-kit',
		mainBranch: 'main',
		releaseBranch: 'main',
	},
};

export default config;
