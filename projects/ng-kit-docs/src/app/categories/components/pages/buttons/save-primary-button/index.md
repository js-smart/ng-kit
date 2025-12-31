# Save Primary Button

A primary button for save actions, styled to indicate importance.

## Description
The Save Primary Button extends the Primary Button and is used for save actions. It is styled to stand out and may include a save icon.

## API
- **disabled**: `boolean` — Disables the button.
- **ariaLabel**: `string` — Accessibility label.
- **(click)**: `EventEmitter<MouseEvent>` — Emits when the button is clicked.

## Usage
```html
<ng-kit-save-primary-button ariaLabel="Save" (click)="onSave()">Save</ng-kit-save-primary-button>
```
