import { Directive } from '@angular/core';
import { BaseButtonDirective } from '../base-button/base-button.directive';

@Directive({
	selector: '[excelExportButton]',
})
export class ExcelExportButtonDirective extends BaseButtonDirective {
	constructor() {
		super();
		const styles = [
			{ property: 'margin-left', value: '20px' },
			{ property: 'margin-right', value: '20px' },
			{ property: 'width', value: '100px' },
			{ property: 'color', value: 'white' },
			{ property: 'background-color', value: 'darkgreen' },
			{ property: 'border-radius', value: '24px' },
		];

		styles.forEach((style) => {
			this.elementRef.nativeElement.style[style.property] = style.value;
		});
	}
}
