# Search Button

A button for search actions, often with a magnifier icon.

## Description
The Search Button extends the Base Button and is used to trigger search actions. It is styled with a search icon and is accessible.

## API
- **disabled**: `boolean` — Disables the button.
- **ariaLabel**: `string` — Accessibility label.
- **(click)**: `EventEmitter<MouseEvent>` — Emits when the button is clicked.

## Usage
```html
<ng-kit-search-button ariaLabel="Search" (click)="onSearch()"></ng-kit-search-button>
```
