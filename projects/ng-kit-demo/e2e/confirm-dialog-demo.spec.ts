import { expect, test } from '@playwright/test';

test('has confirm button', async ({ page }) => {
	await page.goto('/confirm-dialog-demo');
	await expect(page.getByRole('button', { name: 'Click to Confirm' })).toBeVisible();
});

test('opens confirm dialog and shows Confirm status on Yes', async ({ page }) => {
	await page.goto('/confirm-dialog-demo');
	await page.getByRole('button', { name: 'Click to Confirm' }).click();

	await expect(page.getByText('Are you sure you want to do this?')).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Confirm' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Yes' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'No' })).toBeVisible();

	await page.getByRole('button', { name: 'Yes' }).click();
	await expect(page.getByText('Are you sure you want to do this?')).toBeHidden();
	await expect(page.getByText('Confirm Status:Confirmed')).toBeVisible();
});

test('opens confirm dialog and shows Canceled status on No', async ({ page }) => {
	await page.goto('/confirm-dialog-demo');
	await page.getByRole('button', { name: 'Click to Confirm' }).click();

	await expect(page.getByText('Are you sure you want to do this?')).toBeVisible();
	await page.getByRole('button', { name: 'No' }).click();
	await expect(page.getByText('Are you sure you want to do this?')).toBeHidden();
	await expect(page.getByText('Confirm Status:Canceled')).toBeVisible();
});
