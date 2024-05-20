import { test, expect } from '@playwright/test';

test('has success snack bar button', async ({ page }) => {
	await page.goto('/snack-bar-demo');
	await expect(page.getByRole('button', { name: 'Show Success Snack Bar' })).toBeVisible();
});

test('should show success snack bar and close it', async ({ page }) => {
	await page.goto('/snack-bar-demo');
	await page.getByRole('button', { name: 'Show Success Snack Bar' }).click();
	await page.waitForSelector('app-success-snack-bar', { state: 'visible' });
	await expect(page.getByText('Update Success')).toBeVisible();

	await page.locator('.mdc-icon-button').click();
	await expect(page.getByText('Update Success')).toBeHidden();
});

test('should show error snack bar and close it', async ({ page }) => {
	await page.goto('/snack-bar-demo');
	await page.getByRole('button', { name: 'Show Error Snack Bar' }).click();
	await page.waitForSelector('app-error-snack-bar', { state: 'visible' });
	await expect(page.getByText('Failed to update the record')).toBeVisible();

	await page.locator('.mdc-icon-button').click();
	await expect(page.getByText('Failed to update the record')).toBeHidden();
});
