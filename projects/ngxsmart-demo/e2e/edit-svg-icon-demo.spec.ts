import { test, expect } from '@playwright/test';

test('has edit icon button', async ({ page }) => {
	await page.goto('/edit-svg-icon-demo');
	await expect(page.locator('[data-cy=edit-svg-icon-button]')).toBeVisible();
	await page.waitForSelector('edit-solid-svg', { state: 'visible' });
	await page.waitForSelector('mat-icon', { state: 'visible' });
});
