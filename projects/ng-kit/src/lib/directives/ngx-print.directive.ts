import { Directive, HostListener, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

/**
 * Reusable Angular directory that prints given contents of HTML element
 *
 * @since 12.0.0
 * @author Pavan Kumar Jadda
 */
@Directive({
	selector: 'button[ngxPrint], button[print]',
	standalone: true,
})
export class NgxPrintDirective {
	/**
	 * ID of the HTML element those contents need to be printed
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	@Input() printSectionId: string | undefined;

	/**
	 * Title of the HTML element those contents need to be printed
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	@Input() printTitle: string | undefined;

	/**
	 * If `true`, uses CSS of HTMl element, otherwise no CSS applied
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	@Input() useExistingCss = false;

	/**
	 * A delay in milliseconds to force the print dialog to wait before opened. Default: 0
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	@Input() printDelay = 0;

	/**
	 * Instance of the Mat Table Data Source
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	@Input() matTableDataSource!: MatTableDataSource<any>;

	/**
	 * Instance of the Mat Paginator
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	@Input() paginator!: MatPaginator;

	/**
	 * ID of the Mat Paginator
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	@Input() paginatorId = '';

	/**
	 * HTML tag ID of the Mat-Table Input Filter
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	@Input() inputFilterId = '';

	/**
	 * If `true`, referenced table is Mat-Table
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	@Input() isMatTable = false;

	/**
	 * If `true` Mat-Table paginator will be hidden
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	@Input() hideMatTablePaginator = false;

	public printStyleArray = [];
	/**
	 * List of Style sheet files
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	private styleSheetFileArray = '';

	/**
	 * List of CSS properties that needs to be applied while printing the document
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	@Input()
	set printStyle({ values }: PrintStyleParams) {
		for (const key in values) {
			if (values.hasOwnProperty(key)) {
				// @ts-ignore
				this.printStyleArray.push((key + JSON.stringify(values[key])).replace(/['"]+/g, ''));
			}
		}
		this.returnStyleValues();
	}

	/**
	 * Sets given style sheet files to print document
	 *
	 * @param cssList Comma separated value of CSS file names
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	@Input()
	set styleSheetFile(cssList: string) {
		if (cssList.indexOf(',') !== -1) {
			const cssFileArray = cssList.split(',');
			for (const cssFileName of cssFileArray) {
				this.styleSheetFileArray = this.styleSheetFileArray + NgxPrintDirective.linkTagFn(cssFileName);
			}
		} else {
			this.styleSheetFileArray = NgxPrintDirective.linkTagFn(cssList);
		}
	}

	/**
	 * Build link HTMl tag based on given file name
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	private static linkTagFn(cssFileName: string): string {
		return `<link rel="stylesheet" type="text/css" href="${cssFileName}">`;
	}

	/**
	 * Gets HTML element by tag name
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	private static getElementTag(tag: keyof HTMLElementTagNameMap): string {
		const html: string[] = [];
		const elements = document.getElementsByTagName(tag);
		// @ts-ignore
		for (const element of elements) {
			html.push(element.outerHTML);
		}
		return html.join('\r\n');
	}

	/**
	 * Print the element upon clicking the button
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	@HostListener('click')
	public print(): void {
		//Hide paginator for Material table
		if (this.isMatTable && this.hideMatTablePaginator && this.matTableDataSource) {
			this.matTableDataSource.paginator = null;
		}

		setTimeout(() => {
			if (this.isMatTable) {
				this.hideMatPaginatorBeforePrinting();
			}

			// Do something after
			let printContents;
			let popupWin;
			let styles = '';
			let links = '';

			if (this.useExistingCss) {
				styles = NgxPrintDirective.getElementTag('style');
				links = NgxPrintDirective.getElementTag('link');
			}
			if (this.printSectionId) {
				printContents = document.getElementById(this.printSectionId)?.innerHTML;
				popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
				popupWin?.document.open();
				popupWin?.document.write(`
      <html lang="en-us">
        <head>
          <title>${this.printTitle ? this.printTitle : ''}</title>
          ${this.returnStyleValues()}
          ${this.styleSheetFileArray}
          ${styles}
          ${links}
        </head>
        <body>
          ${printContents}
          <script defer>
            function triggerPrint() {
              window.removeEventListener('load', triggerPrint, false);
              setTimeout(() => {
                window.print();
                setTimeout(function() { window.close(); }, 0);
              }, ${this.printDelay});
            }
            window.addEventListener('load', triggerPrint, false);
          </script>
        </body>
      </html>`);

				popupWin?.document.close();

				//Revert back the mat-paginator after printing
				if (this.isMatTable) {
					this.showMatPaginatorAfterPrinting();
				}
			}
		}, 1000); //1 second timeout to hide paginator
	}

	/**
	 * Hide Mat Paginator before Printing
	 *
	 * @since 12.0.1
	 * @author Pavan Kumar Jadda
	 */
	private hideMatPaginatorBeforePrinting() {
		// @ts-ignore
		document.getElementById(this.paginatorId).style.display = 'none';
		if (document.getElementById(this.inputFilterId) != null) {
			// @ts-ignore
			document.getElementById(this.inputFilterId).style.display = 'none';
		}
	}

	/**
	 * Show Mat Paginator after Printing
	 *
	 * @since 12.0.1
	 * @author Pavan Kumar Jadda
	 */
	private showMatPaginatorAfterPrinting() {
		this.matTableDataSource.paginator = this.paginator;
		// @ts-ignore
		document.getElementById(this.paginatorId).style.display = 'block';
		if (document.getElementById(this.inputFilterId) != null) {
			// @ts-ignore
			document.getElementById(this.inputFilterId).style.display = 'block';
		}
	}

	/**
	 * @returns the string that create the stylesheet which will be injected later within <style></style> tag. Join/replace to transform an array objects to css-styled string
	 *
	 * @since 12.0.0
	 * @author Pavan Kumar Jadda
	 */
	private returnStyleValues() {
		return `<style> ${this.printStyleArray.join(' ').replace(/,/g, ';')} </style>`;
	}
}

interface PrintStyleParams {
	values: Record<string, Record<string, string>>;
}
