import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('/');

	// Expect h1 to contain a substring.
	expect(await page.title()).toContain('Angular Utilities Demo');
});

test('has links', async ({ page }) => {
	await page.goto('/');

	// Expect all links to be visible.
	await expect(page.getByRole('link', { name: 'Auto Complete Demo' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Alert Demo' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Edit Svg Icon Demo' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Buttons Demo' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Directives Demo' })).toBeVisible();
});
