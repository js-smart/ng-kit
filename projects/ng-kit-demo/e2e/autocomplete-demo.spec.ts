import { expect, test, type Locator, type Page } from '@playwright/test';

const AUTOCOMPLETE_DEMO_URL = '/autocomplete-demo';
const cityOption = (page: Page, name: string): Locator => page.getByRole('option', { name });
const formAt = (page: Page, index: number): Locator => page.locator('form').nth(index);
const inputAt = (page: Page, index: number): Locator => formAt(page, index).locator('input').first();
const clearButtonAt = (page: Page, index: number): Locator => formAt(page, index).locator('button[aria-label="Clear"]');
const toggleButtonAt = (page: Page, index: number): Locator => formAt(page, index).locator('button[aria-label="Toggle dropdown"]');
const selectedValueAt = (page: Page, index: number): Locator => page.locator('div:has(> p:text-is("Selected Option Is:")) h2').nth(index);

test.describe('Autocomplete Demo', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(AUTOCOMPLETE_DEMO_URL);
		await expect(inputAt(page, 0)).toBeVisible({ timeout: 15000 });
	});

	test('displays all three autocomplete sections', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Autocomplete with Objects', level: 1 })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Autocomplete with Loading State', level: 2 })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Autocomplete with Disabled State', level: 2 })).toBeVisible();
		await expect(page.locator('form')).toHaveCount(3);
		await expect(inputAt(page, 0)).toHaveAttribute('placeholder', 'Select City');
		await expect(inputAt(page, 1)).toHaveAttribute('placeholder', 'Select City');
		await expect(inputAt(page, 2)).toHaveAttribute('placeholder', 'Select City');
	});

	test.describe('Autocomplete with Objects', () => {
		test('opens panel and shows all city options when input is focused', async ({ page }) => {
			await inputAt(page, 0).click();
			await expect(cityOption(page, 'New York')).toBeVisible();
			await expect(cityOption(page, 'Boston')).toBeVisible();
			await expect(cityOption(page, 'Washington DC')).toBeVisible();
		});

		test('opens panel when toggle dropdown button is clicked', async ({ page }) => {
			await toggleButtonAt(page, 0).click();
			await expect(cityOption(page, 'Boston')).toBeVisible();
		});

		test('selects an option and displays selected value below', async ({ page }) => {
			await inputAt(page, 0).click();
			await expect(cityOption(page, 'Boston')).toBeVisible();
			await cityOption(page, 'Boston').click();
			await expect(inputAt(page, 0)).toHaveValue('Boston');
			await expect(selectedValueAt(page, 0)).toHaveText('Boston');
		});

		test('filters options when typing', async ({ page }) => {
			const input = inputAt(page, 0);
			await input.click();
			await input.pressSequentially('wash', { delay: 50 });
			await expect(cityOption(page, 'Washington DC')).toBeVisible();
			await expect(cityOption(page, 'New York')).toHaveCount(0);
			await expect(cityOption(page, 'Boston')).toHaveCount(0);
		});

		test('selects filtered option', async ({ page }) => {
			const input = inputAt(page, 0);
			await input.click();
			await input.pressSequentially('new', { delay: 50 });
			await cityOption(page, 'New York').click();
			await expect(input).toHaveValue('New York');
			await expect(selectedValueAt(page, 0)).toHaveText('New York');
		});

		test('clears selection when clear button is clicked', async ({ page }) => {
			await inputAt(page, 0).click();
			await cityOption(page, 'Boston').click();
			await expect(inputAt(page, 0)).toHaveValue('Boston');
			await clearButtonAt(page, 0).click();
			await expect(inputAt(page, 0)).toHaveValue('');
			await expect(selectedValueAt(page, 0)).toBeEmpty();
		});

		test('shows no options when search has no match', async ({ page }) => {
			const input = inputAt(page, 0);
			await input.click();
			await input.pressSequentially('xyz', { delay: 50 });
			await expect(page.getByRole('option', { name: 'No options' })).toBeVisible();
		});

		test('clear button has visibility hidden when no value is selected', async ({ page }) => {
			const firstFormClearBtn = clearButtonAt(page, 0);
			await expect(firstFormClearBtn).toHaveCount(1);
			await expect(firstFormClearBtn).toHaveCSS('visibility', 'hidden');
			await inputAt(page, 0).click();
			await cityOption(page, 'Boston').click();
			await expect(firstFormClearBtn).toHaveCSS('visibility', 'visible');
		});
	});

	test.describe('Autocomplete with Loading State', () => {
		test('shows loading state or options when panel is opened', async ({ page }) => {
			await inputAt(page, 1).click();
			await expect(page.getByText('Fetching cities...').or(cityOption(page, 'New York'))).toBeVisible({ timeout: 12000 });
		});

		test('shows options after loading completes and allows selection', async ({ page }) => {
			await inputAt(page, 1).click();
			await expect(cityOption(page, 'New York')).toBeVisible({ timeout: 12000 });
			await expect(cityOption(page, 'Boston')).toBeVisible();
			await expect(cityOption(page, 'Washington DC')).toBeVisible();
		});

		test('can select option after loading', async ({ page }) => {
			await inputAt(page, 1).click();
			await expect(cityOption(page, 'Washington DC')).toBeVisible({ timeout: 12000 });
			await cityOption(page, 'Washington DC').click();
			await expect(inputAt(page, 1)).toHaveValue('Washington DC');
			await expect(selectedValueAt(page, 1)).toHaveText('Washington DC');
		});
	});

	test.describe('Autocomplete with Disabled State', () => {
		test('is initially disabled with New York pre-selected', async ({ page }) => {
			const input = inputAt(page, 2);
			await expect(input).toBeDisabled();
			await expect(input).toHaveValue('New York');
		});

		test('toggle button shows Enable when disabled', async ({ page }) => {
			await expect(page.getByRole('button', { name: 'Enable' })).toBeVisible();
		});

		test('enabling allows interaction and selection', async ({ page }) => {
			await page.getByRole('button', { name: 'Enable' }).click();
			const input = inputAt(page, 2);
			await expect(input).toBeEnabled();
			await input.click();
			await cityOption(page, 'Boston').click();
			await expect(input).toHaveValue('Boston');
		});

		test('disabling again prevents interaction', async ({ page }) => {
			await page.getByRole('button', { name: 'Enable' }).click();
			await expect(inputAt(page, 2)).toBeEnabled();
			await page.getByRole('button', { name: 'Disable' }).click();
			await expect(inputAt(page, 2)).toBeDisabled();
		});

		test('toggle button shows Disable when enabled', async ({ page }) => {
			await page.getByRole('button', { name: 'Enable' }).click();
			await expect(page.getByRole('button', { name: 'Disable' })).toBeVisible();
		});

		test('clear and dropdown buttons are not visible when disabled', async ({ page }) => {
			await expect(clearButtonAt(page, 2)).toHaveCount(0);
			await expect(toggleButtonAt(page, 2)).toHaveCount(0);
		});
	});
});
