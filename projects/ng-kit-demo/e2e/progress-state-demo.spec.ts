import { expect, test } from '@playwright/test';

test('has Save Data button', async ({ page }) => {
	await page.goto('/progress-state-demo');
	await expect(page.getByRole('button', { name: 'Save Data' })).toBeVisible();
});

test('shows loading state then success message when Save Data is clicked', async ({ page }) => {
	await page.goto('/progress-state-demo');
	await page.getByRole('button', { name: 'Save Data' }).click();

	await expect(page.getByText('Saving...').or(page.getByText('Save Data'))).toBeVisible();

	// Success is shown after 2s
	await expect(page.getByText('Your data has been saved.')).toBeVisible({ timeout: 10000 });
});
