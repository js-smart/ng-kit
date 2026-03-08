import { expect, test } from '@playwright/test';

test('has demo title and export button', async ({ page }) => {
	await page.goto('/ngx-print-demo');
	await expect(page.getByRole('heading', { name: 'NGX Print Directive Demo' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Export to PDF' })).toBeVisible();
});

test('has table with expected columns', async ({ page }) => {
	await page.goto('/ngx-print-demo');
	await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
	await expect(page.getByRole('columnheader', { name: 'Email' })).toBeVisible();
	await expect(page.getByRole('columnheader', { name: 'Phone' })).toBeVisible();
	await expect(page.getByRole('columnheader', { name: 'Website' })).toBeVisible();
});

test('table loads data', async ({ page }) => {
	await page.goto('/ngx-print-demo');
	// Wait for data from API (jsonplaceholder)
	await expect(page.locator('table mat-row').first()).toBeVisible({ timeout: 10000 });
});
