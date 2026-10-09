import { expect, test } from '@playwright/test';

test('has success alert', async ({ page }) => {
	await page.goto('/alert-demo');
	await expect(page.getByText('Success Alert')).toHaveCount(2);
	await expect(page.getByRole('button', { name: 'Close', exact: true })).toHaveCount(2);
});

test('has error alert', async ({ page }) => {
	await page.goto('/alert-demo');
	await expect(page.getByText('Error Alert')).toHaveCount(2);
	await expect(page.getByRole('button', { name: 'Close', exact: true })).toHaveCount(2);
});
