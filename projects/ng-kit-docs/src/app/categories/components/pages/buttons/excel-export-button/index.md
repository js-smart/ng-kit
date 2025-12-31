A button for exporting data to Excel format. The Excel Export Button extends the Base Button and is used to trigger the export of data to an Excel file. It is styled to indicate export functionality and may include an Excel icon.

## API
- **fileName**: `string` — Name of the exported Excel file.
- **disabled**: `boolean` — Disables the button.
- **ariaLabel**: `string` — Accessibility label.
- **(export)**: `EventEmitter<void>` — Emits when export is triggered.

## Usage
```html
<ng-kit-excel-export-button fileName="data.xlsx" (export)="onExport()"></ng-kit-excel-export-button>
```
