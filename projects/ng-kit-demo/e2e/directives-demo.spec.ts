import { expect, test } from '@playwright/test';

test('has throttle button button', async ({ page }) => {
	await page.goto('/directives-demo');
	await expect(page.locator('button[viewButton]')).toBeVisible();
	await expect(page.getByRole('button', { name: 'Throttle Button' })).toBeVisible();
	await expect(page.locator('mat-icon', { hasText: 'visibility' })).toBeVisible();
});
