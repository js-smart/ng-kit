import { test, expect } from '@playwright/test';

test('has success alert', async ({ page }) => {
	await page.goto('/alert-demo');
	expect(page.getByText('Success Alert').count()).toEqual(2);
	expect(page.locator('css=btn-close').count()).toEqual(2);
});

test('has error alert', async ({ page }) => {
	await page.goto('/alert-demo');
	expect(page.getByText('Error Alert').count()).toEqual(2);
	expect(page.locator('css=btn-close').count()).toEqual(2);
});
