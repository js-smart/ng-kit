# Manage Button

A button for management actions, such as opening settings or admin panels.

## Description
The Manage Button extends the Base Button and is styled for actions related to management or administration. It may include a gear or settings icon.

## API
- **disabled**: `boolean` — Disables the button.
- **ariaLabel**: `string` — Accessibility label.
- **(click)**: `EventEmitter<MouseEvent>` — Emits when the button is clicked.

## Usage
```html
<ng-kit-manage-button ariaLabel="Manage settings" (click)="onManage()"></ng-kit-manage-button>
```
