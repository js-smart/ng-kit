# Delete Button

A button for delete actions, often styled with a danger color and icon.

## Description
The Delete Button extends the Base Button and is used to trigger destructive actions. It typically displays a trash or delete icon and uses a warning color.

## API
- **disabled**: `boolean` — Disables the button.
- **ariaLabel**: `string` — Accessibility label.
- **(click)**: `EventEmitter<MouseEvent>` — Emits when the button is clicked.

## Usage
```html
<ng-kit-delete-button ariaLabel="Delete item" (click)="onDelete()"></ng-kit-delete-button>
```
