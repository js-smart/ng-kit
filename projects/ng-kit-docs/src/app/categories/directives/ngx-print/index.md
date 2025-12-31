`ngx-print` is a powerful and reusable Angular directive that enables printing of any specified section of your application. It provides rich printing capabilities including:

1. Angular Material Table support (with pagination)
2. jQuery DataTable support

With extensive options for custom styling, handling paginated data tables, external stylesheets, and print preview, `ngx-print` makes it easy to print or preview exactly the content you want. The directive can open a print dialog or a live preview window, ensuring your printed pages look exactly as needed.

## Usage

The directive can be applied to any button element using the `ngxPrint` or `print` attribute selector.

### Basic Usage

```html
<div id="print-section">
  <h1>Document Title</h1>
  <p>Content to be printed...</p>
</div>

<button ngxPrint printSectionId="print-section">Print</button>
```

### With Print Title

```html
<button 
  ngxPrint 
  printSectionId="print-section"
  printTitle="My Document">
  Print Document
</button>
```

### With Custom Styling

```html
<button 
  ngxPrint 
  printSectionId="print-section"
  [printStyle]="{ values: { '@media print': { 'body': { 'margin': '0' } } } }">
  Print with Custom Style
</button>
```

### With Material Table Support

```html
<mat-table [dataSource]="dataSource">
  <!-- table content -->
</mat-table>

<mat-paginator #paginator [pageSizeOptions]="[5, 10, 20]"></mat-paginator>

<button 
  ngxPrint 
  printSectionId="print-section"
  [isMatTable]="true"
  [matTableDataSource]="dataSource"
  [paginator]="paginator"
  paginatorId="paginator-id"
  [hideMatTablePaginator]="true">
  Print Table
</button>
```

### With External Stylesheet

```html
<button 
  ngxPrint 
  printSectionId="print-section"
  styleSheetFile="styles/print.css,styles/custom.css">
  Print with External CSS
</button>
```

### Preview Only (No Print Dialog)

```html
<button 
  ngxPrint 
  printSectionId="print-section"
  [previewOnly]="true">
  Preview
</button>
```

## API Reference

The ngx-print directive provides the following inputs for configuring print behavior.

| Name                    | Type                      | Default      | Description                                                                 |
|-------------------------|---------------------------|--------------|-----------------------------------------------------------------------------|
| `printSectionId`        | string \| undefined        | undefined    | ID of the HTML element whose contents need to be printed                    |
| `printTitle`            | string \| undefined        | undefined    | Title of the document to be printed (appears in print preview)              |
| `useExistingCss`        | boolean                   | false        | If `true`, uses existing CSS from the HTML element, otherwise no CSS applied |
| `printDelay`                | number                    | 0            | Delay in milliseconds before opening the print dialog                      |
| `matTableDataSource`    | MatTableDataSource\<T\>    | -            | Instance of the Material Table Data Source (required for Material table support) |
| `paginator`             | MatPaginator              | -            | Instance of the Material Paginator (required for Material table support)    |
| `paginatorId`           | string                    | ''           | HTML element ID of the Mat Paginator                                        |
| `inputFilterId`         | string                    | ''           | HTML element ID of the Mat-Table input filter                               |
| `isMatTable`            | boolean                   | false        | If `true`, indicates the referenced table is a Material Table                |
| `hideMatTablePaginator` | boolean                   | false        | If `true`, hides the Mat-Table paginator during printing                    |
| `previewOnly`           | boolean                   | false        | If `true`, prevents the print dialog from opening (preview only)            |
| `printStyle`            | PrintStyleParams          | -            | Object containing CSS properties to apply while printing                    |
| `styleSheetFile`        | string                    | ''           | Comma-separated list of CSS file paths to include in the print document     |

### PrintStyleParams Interface

The `printStyle` input accepts an object with the following structure:

```typescript
interface PrintStyleParams {
  values: Record<string, Record<string, string>>;
}
```

Example:
```typescript
{
  values: {
    '@media print': {
      'body': { 'margin': '0', 'font-size': '12px' },
      '.no-print': { 'display': 'none' }
    }
  }
}
```

### PrintOptions Class

The directive internally uses a `PrintOptions` class with the following properties (some are exposed as directive inputs):

| Property          | Type    | Default | Description                                    |
|-------------------|---------|---------|------------------------------------------------|
| `printSectionId`  | string  | ''      | ID of the section to print                     |
| `printTitle`      | string  | ''      | Title for the print document                   |
| `useExistingCss`  | boolean | false   | Use existing CSS from the page                 |
| `bodyClass`       | string  | ''      | CSS class to apply to the print body         |
| `openNewTab`      | boolean | false   | Open print preview in a new tab                |
| `previewOnly`     | boolean | false   | Show preview without print dialog              |
| `closeWindow`     | boolean | true    | Close the print window after printing         |
| `printDelay`      | number  | 0       | Delay before opening print dialog             |

## Features

- **Flexible Content Selection**: Print any HTML element by its ID
- **Custom Styling**: Apply custom CSS styles for print media
- **External Stylesheets**: Include external CSS files in the print document
- **Material Table Support**: Special handling for Angular Material tables with pagination
- **Print Delay**: Configure delay before opening the print dialog
- **Preview Mode**: Preview content without opening the print dialog
- **Automatic Cleanup**: Automatically closes the print window after printing

## Notes

- The directive selector is `button[ngxPrint]` or `button[print]`, so it must be applied to a button element
- When using Material table support, ensure `matTableDataSource` and `paginator` are properly provided
- The `printSectionId` is required for the directive to function
- External stylesheet files should be accessible via HTTP/HTTPS
- The directive uses a 1-second timeout to hide paginators before printing Material tables

