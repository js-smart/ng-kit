# View Primary Button

A primary-styled button for view or details actions.

## Description
The View Primary Button extends the View Button and is styled as a primary action. It is used for prominent view or details actions, often with an eye icon and primary color.

## API
- **disabled**: `boolean` — Disables the button.
- **ariaLabel**: `string` — Accessibility label.
- **(click)**: `EventEmitter<MouseEvent>` — Emits when the button is clicked.

## Usage
```html
<ng-kit-view-primary-button ariaLabel="View details" (click)="onView()">View</ng-kit-view-primary-button>
```
