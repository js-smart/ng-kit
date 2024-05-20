import { test, expect } from '@playwright/test';

test('has success alert', async ({ page }) => {
	await page.goto('/alert-demo');
	await expect(page.getByText('Success Alert')).toHaveCount(2);
	await expect(page.locator('.btn-close')).toHaveCount(2);
});

test('has error alert', async ({ page }) => {
	await page.goto('/alert-demo');
	await expect(page.getByText('Error Alert')).toHaveCount(2);
	await expect(page.locator('.btn-close')).toHaveCount(2);
});
