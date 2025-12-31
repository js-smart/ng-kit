# Primary Button

A button styled as the primary action button.

## Description
The Primary Button extends the Base Button and is styled to stand out as the main action on a page or form. It uses a prominent color and may include an icon.

## API
- **disabled**: `boolean` — Disables the button.
- **ariaLabel**: `string` — Accessibility label.
- **(click)**: `EventEmitter<MouseEvent>` — Emits when the button is clicked.

## Usage
```html
<ng-kit-primary-button ariaLabel="Submit" (click)="onSubmit()">Submit</ng-kit-primary-button>
```
