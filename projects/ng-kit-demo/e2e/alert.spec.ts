import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('/');

	// Expect h1 to contain a substring.
	expect(await page.title()).toContain('Angular Utilities Demo');
});

test('has links', async ({ page }) => {
	await page.goto('/');

	// The home is now the gallery overview; assert its nav/card links render.
	await expect(page.getByRole('link', { name: 'Autocomplete' }).first()).toBeVisible();
	await expect(page.getByRole('link', { name: 'Alert' }).first()).toBeVisible();
	await expect(page.getByRole('link', { name: 'Buttons' }).first()).toBeVisible();
	await expect(page.getByRole('link', { name: 'Introduction' }).first()).toBeVisible();
});
