# Edit SVG Icon Button

A button for edit actions using a custom SVG icon.

## Description
The Edit SVG Icon Button extends the Base Button and displays a custom SVG icon for edit actions. Useful for consistent iconography across your app.

## API
- **icon**: `string` — SVG icon name or path.
- **disabled**: `boolean` — Disables the button.
- **ariaLabel**: `string` — Accessibility label.
- **(click)**: `EventEmitter<MouseEvent>` — Emits when the button is clicked.

## Usage
```html
<ng-kit-edit-svg-icon-button icon="edit" ariaLabel="Edit item" (click)="onEdit()"></ng-kit-edit-svg-icon-button>
```
