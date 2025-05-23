export class PrintOptions {
	printSectionId = '';
	printTitle = '';
	useExistingCss = false;
	bodyClass = '';
	openNewTab = false;
	previewOnly = false;
	closeWindow = true;
	printDelay = 0;

	constructor(options?: Partial<PrintOptions>) {
		if (options) {
			Object.assign(this, options);
		}
	}
}
