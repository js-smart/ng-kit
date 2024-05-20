import { test, expect } from '@playwright/test';

test('has all buttons', async ({ page }) => {
	await page.goto('/buttons-demo');
	await expect(page.locator('[data-cy=primary-button]', { hasText: 'Primary Button' })).toBeVisible();
	await expect(page.locator('[data-cy=save-primary-button]')).toBeVisible();
	await expect(page.locator('[data-cy=view-button]')).toBeVisible();
	await expect(page.locator('[data-cy=edit-button]')).toBeVisible();
	await expect(page.locator('[data-cy=edit-svg-icon-button]')).toBeVisible();
	await expect(page.locator('[data-cy=edit-bs-button]')).toBeVisible();
	await expect(page.locator('[data-cy=bs-link-button]')).toBeVisible();
	await expect(page.locator('[data-cy=success-button]')).toBeVisible();
	await expect(page.locator('[data-cy=delete-button]')).toBeVisible();
	await expect(page.locator('[data-cy=manage-button]')).toBeVisible();
	await expect(page.locator('[data-cy=primary-button]', { hasText: 'Search' })).toBeVisible();
	await expect(page.locator('[data-cy=pdf-export-button]')).toBeVisible();
	await expect(page.locator('[data-cy=excel-export-button]')).toBeVisible();
});

test('has progress states', async ({ page }) => {
	await page.goto('/buttons-demo');

	await page.locator('[data-cy=success-button]').click();
	await expect(page.getByText('Updating...')).toBeVisible();
	await expect(page.getByText('Deleting...')).toBeVisible();
	await expect(page.getByText('Saving...')).toHaveCount(2);
});
