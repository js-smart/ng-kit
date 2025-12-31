# Edit Button

A button for edit actions, typically with a pencil or edit icon.

## Description
The Edit Button extends the Base Button and is used to trigger editing of content. It is styled to indicate an edit action and is accessible.

## API
- **disabled**: `boolean` — Disables the button.
- **ariaLabel**: `string` — Accessibility label.
- **(click)**: `EventEmitter<MouseEvent>` — Emits when the button is clicked.

## Usage
```html
<ng-kit-edit-button ariaLabel="Edit item" (click)="onEdit()"></ng-kit-edit-button>
```
