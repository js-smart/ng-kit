import { expect, test, type Locator, type Page } from '@playwright/test';

const AUTOCOMPLETE_DEMO_URL = '/autocomplete-demo';

/** Form indices in the demo page layout */
const OBJECTS_FORM = 0;
const STRINGS_FORM = 1;
const LOADING_FORM = 2;
const DISABLED_FORM = 3;

const cityOption = (page: Page, name: string): Locator => page.getByRole('option', { name });
const formAt = (page: Page, index: number): Locator => page.locator('form').nth(index);
const inputAt = (page: Page, index: number): Locator => formAt(page, index).locator('input').first();
// The ported component labels its clear button "Clear" (clearText) and its
// dropdown toggle "Open"/"Close" (openText/closeText) by default.
const clearButtonAt = (page: Page, index: number): Locator => formAt(page, index).getByRole('button', { name: 'Clear', exact: true });
const toggleButtonAt = (page: Page, index: number): Locator => formAt(page, index).getByRole('button', { name: /^(open|close)$/i });
const selectedValueAt = (page: Page, index: number): Locator => page.locator('div:has(> p:text-is("Selected Option Is:")) h2').nth(index);

test.describe('Autocomplete Demo', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(AUTOCOMPLETE_DEMO_URL);
		await expect(inputAt(page, OBJECTS_FORM)).toBeVisible({ timeout: 15000 });
	});

	test('displays all four autocomplete sections', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Autocomplete with Objects', level: 1 })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Autocomplete with Strings', level: 1 })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Autocomplete with Loading State', level: 2 })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Autocomplete with Disabled State', level: 2 })).toBeVisible();
		await expect(page.locator('form')).toHaveCount(4);
		await expect(inputAt(page, OBJECTS_FORM)).toHaveAttribute('placeholder', 'Select City');
		await expect(inputAt(page, STRINGS_FORM)).toHaveAttribute('placeholder', 'Select City');
		await expect(inputAt(page, LOADING_FORM)).toHaveAttribute('placeholder', 'Select City');
		await expect(inputAt(page, DISABLED_FORM)).toHaveAttribute('placeholder', 'Select City');
	});

	test('has open in stackblitz button', async ({ page }) => {
		await expect(page.getByRole('button', { name: '🚀 Open in StackBlitz' })).toBeVisible();
	});

	test.describe('Autocomplete with Objects', () => {
		test('opens panel and shows all city options when input is focused', async ({ page }) => {
			await inputAt(page, OBJECTS_FORM).click();
			await expect(cityOption(page, 'New York')).toBeVisible();
			await expect(cityOption(page, 'Boston')).toBeVisible();
			await expect(cityOption(page, 'Washington DC')).toBeVisible();
		});

		test('opens panel when toggle dropdown button is clicked', async ({ page }) => {
			await toggleButtonAt(page, OBJECTS_FORM).click();
			await expect(cityOption(page, 'Boston')).toBeVisible();
		});

		test('selects an option and displays selected value below', async ({ page }) => {
			await inputAt(page, OBJECTS_FORM).click();
			await expect(cityOption(page, 'Boston')).toBeVisible();
			await cityOption(page, 'Boston').click();
			await expect(inputAt(page, OBJECTS_FORM)).toHaveValue('Boston');
			await expect(selectedValueAt(page, 0)).toHaveText('Boston');
		});

		test('filters options when typing', async ({ page }) => {
			const input = inputAt(page, OBJECTS_FORM);
			await input.click();
			await input.pressSequentially('wash', { delay: 50 });
			await expect(cityOption(page, 'Washington DC')).toBeVisible();
			await expect(cityOption(page, 'New York')).toHaveCount(0);
			await expect(cityOption(page, 'Boston')).toHaveCount(0);
		});

		test('selects filtered option', async ({ page }) => {
			const input = inputAt(page, OBJECTS_FORM);
			await input.click();
			await input.pressSequentially('new', { delay: 50 });
			await cityOption(page, 'New York').click();
			await expect(input).toHaveValue('New York');
			await expect(selectedValueAt(page, 0)).toHaveText('New York');
		});

		test('clears selection when clear button is clicked', async ({ page }) => {
			await inputAt(page, OBJECTS_FORM).click();
			await cityOption(page, 'Boston').click();
			await expect(inputAt(page, OBJECTS_FORM)).toHaveValue('Boston');
			await clearButtonAt(page, OBJECTS_FORM).click();
			await expect(inputAt(page, OBJECTS_FORM)).toHaveValue('');
			await expect(selectedValueAt(page, 0)).toBeEmpty();
		});

		test('shows no options when search has no match', async ({ page }) => {
			const input = inputAt(page, OBJECTS_FORM);
			await input.click();
			await input.pressSequentially('xyz', { delay: 50 });
			// The ported component renders the empty message as a status region (not a disabled option).
			await expect(page.getByText('No options')).toBeVisible();
		});

		test('clear button is not shown when no value is selected', async ({ page }) => {
			const firstFormClearBtn = clearButtonAt(page, OBJECTS_FORM);
			await expect(firstFormClearBtn).toHaveCount(0);
			await inputAt(page, OBJECTS_FORM).click();
			await cityOption(page, 'Boston').click();
			await expect(clearButtonAt(page, OBJECTS_FORM)).toHaveCount(1);
		});
	});

	test.describe('Autocomplete with Loading State', () => {
		test('shows loading state or options when panel is opened', async ({ page }) => {
			await inputAt(page, LOADING_FORM).click();
			await expect(page.getByText('Fetching cities...').or(cityOption(page, 'New York'))).toBeVisible({ timeout: 12000 });
		});

		test('shows options after loading completes and allows selection', async ({ page }) => {
			await inputAt(page, LOADING_FORM).click();
			await expect(cityOption(page, 'New York')).toBeVisible({ timeout: 12000 });
			await expect(cityOption(page, 'Boston')).toBeVisible();
			await expect(cityOption(page, 'Washington DC')).toBeVisible();
		});

		test('can select option after loading', async ({ page }) => {
			await inputAt(page, LOADING_FORM).click();
			await expect(cityOption(page, 'Washington DC')).toBeVisible({ timeout: 12000 });
			await cityOption(page, 'Washington DC').click();
			await expect(inputAt(page, LOADING_FORM)).toHaveValue('Washington DC');
			await expect(selectedValueAt(page, 2)).toHaveText('Washington DC');
		});
	});

	test.describe('Autocomplete with Disabled State', () => {
		test('is initially disabled with New York pre-selected', async ({ page }) => {
			const input = inputAt(page, DISABLED_FORM);
			await expect(input).toBeDisabled();
			await expect(input).toHaveValue('New York');
		});

		test('toggle button shows Enable when disabled', async ({ page }) => {
			await expect(page.getByRole('button', { name: 'Enable' })).toBeVisible();
		});

		test('enabling allows interaction and selection', async ({ page }) => {
			await page.getByRole('button', { name: 'Enable' }).click();
			const input = inputAt(page, DISABLED_FORM);
			await expect(input).toBeEnabled();
			await input.click();
			await cityOption(page, 'Boston').click();
			await expect(input).toHaveValue('Boston');
		});

		test('disabling again prevents interaction', async ({ page }) => {
			await page.getByRole('button', { name: 'Enable' }).click();
			await expect(inputAt(page, DISABLED_FORM)).toBeEnabled();
			await page.getByRole('button', { name: 'Disable' }).click();
			await expect(inputAt(page, DISABLED_FORM)).toBeDisabled();
		});

		test('toggle button shows Disable when enabled', async ({ page }) => {
			await page.getByRole('button', { name: 'Enable' }).click();
			await expect(page.getByRole('button', { name: 'Disable' })).toBeVisible();
		});

		test('clear button is hidden and dropdown toggle is disabled when the field is disabled', async ({ page }) => {
			// Clear affordance leaves the a11y tree (aria-hidden + visibility:hidden) when there is nothing to clear.
			await expect(clearButtonAt(page, DISABLED_FORM)).toHaveCount(0);
			// The dropdown toggle stays in the DOM but is disabled alongside the field.
			await expect(toggleButtonAt(page, DISABLED_FORM)).toBeDisabled();
		});
	});
});
