# PDF Export Button

A button for exporting data to PDF format.

## Description
The PDF Export Button extends the Base Button and is used to trigger the export of data to a PDF file. It is styled to indicate export functionality and may include a PDF icon.

## API
- **fileName**: `string` — Name of the exported PDF file.
- **disabled**: `boolean` — Disables the button.
- **ariaLabel**: `string` — Accessibility label.
- **(export)**: `EventEmitter<void>` — Emits when export is triggered.

## Usage
```html
<ng-kit-pdf-export-button fileName="data.pdf" (export)="onExport()"></ng-kit-pdf-export-button>
```
