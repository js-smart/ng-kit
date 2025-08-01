import { Directive } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';

@Directive({
	selector: '[pdfExportButton]',
})
export class PdfExportButtonDirective extends BaseButtonDirective {
	constructor() {
		super();
		const styles = [
			{ property: 'margin-left', value: '20px' },
			{ property: 'width', value: '100px' },
			{ property: 'color', value: 'white' },
			{ property: 'background-color', value: '#a3071b' },
			{ property: 'border-radius', value: '24px' },
		];

		styles.forEach((style) => {
			this.renderer.setStyle(this.elementRef.nativeElement, style.property, style.value);
		});
	}
}
