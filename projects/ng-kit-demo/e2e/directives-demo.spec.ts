import { test, expect } from '@playwright/test';

test('has throttle button button', async ({ page }) => {
	await page.goto('/directives-demo');
	await page.waitForSelector('view-button', { state: 'visible' });
	await expect(page.getByText('Throttle Button')).toBeVisible();
	await expect(page.getByText('visibility')).toBeVisible();
});
