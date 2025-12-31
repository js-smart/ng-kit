# Success Button

A button styled to indicate a successful or positive action.

## Description
The Success Button extends the Base Button and is styled with a success color, typically green. It is used for actions that result in a positive outcome.

## API
- **disabled**: `boolean` — Disables the button.
- **ariaLabel**: `string` — Accessibility label.
- **(click)**: `EventEmitter<MouseEvent>` — Emits when the button is clicked.

## Usage
```html
<ng-kit-success-button ariaLabel="Success" (click)="onSuccess()">Success</ng-kit-success-button>
```
