import { devices, type PlaywrightTestConfig } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
	testDir: './projects/ng-kit-docs/e2e',
	/* Maximum time one test can run for. */
	timeout: 30000,
	expect: {
		/**
		 * Maximum time expect() should wait for the condition to be met.
		 * For example in `await expect(locator).toHaveText();`
		 */
		timeout: 20000,
	},
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env['CI'],
	/* Retry on CI twice */
	retries: process.env['CI'] ? 1 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env['CI'] ? 3 : 4,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'list',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: process.env['URL'],

		/* set data-cy as test attribute */
		testIdAttribute: 'data-cy',

		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 0,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
		screenshot: 'off',
		video: 'off',
	},

	/* Configure projects for major browsers */
	projects: [
		{ name: 'setup', testMatch: /.*\.setup\.ts/ },
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
			},
			dependencies: ['setup'],
		},
		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
			},
			dependencies: ['setup'],
		},
		{
			name: 'webkit',
			use: {
				...devices['Desktop Safari'],
			},
			dependencies: ['setup'],
		},
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: 'pnpm start',
		url: 'http://localhost:4300',
	},
};

export default config;
