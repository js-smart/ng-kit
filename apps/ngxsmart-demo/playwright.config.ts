import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
// @ts-ignore
import { workspaceRoot } from '@nx/devkit';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	...nxE2EPreset(__filename, { testDir: './e2e' }),
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	/* Maximum time one test can run for. */
	//timeout: 30000,
	expect: {
		/**
		 * Maximum time expect() should wait for the condition to be met.
		 * For example in `await expect(locator).toHaveText();`
		 */
		timeout: 10000,
	},
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 4 : 4,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: process.env.CI ? 'dot' : 'list',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 0,
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: process.env.CI ? process.env.URL : 'http://localhost:4300',
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
		screenshot: 'off',
		video: 'off',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',

			/* Project-specific settings. */
			use: {
				...devices['Desktop Chrome'],
			},
		},
		/* Test against branded browsers. */
		/*	{
			name: 'Microsoft Edge',
			use: {
				channel: 'msedge',
			},
		},*/
		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
			},
		},
		{
			name: 'webkit',
			use: {
				...devices['Desktop Safari'],
			},
		},
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: 'pnpm start',
		url: 'https://localhost:4300',
		reuseExistingServer: !process.env.CI,
		cwd: workspaceRoot,
	},
});
