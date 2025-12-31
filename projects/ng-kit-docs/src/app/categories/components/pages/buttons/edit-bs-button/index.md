# Edit BS Button

A Bootstrap-styled button for edit actions, often with a pencil icon.

## Description
The Edit BS Button extends the Base Button and is styled for edit actions, using Bootstrap conventions. It is commonly used to trigger editing of items in lists or tables.

## API
- **disabled**: `boolean` — Disables the button.
- **ariaLabel**: `string` — Accessibility label.
- **(click)**: `EventEmitter<MouseEvent>` — Emits when the button is clicked.

## Usage
```html
<ng-kit-edit-bs-button ariaLabel="Edit item" (click)="onEdit()"></ng-kit-edit-bs-button>
```
