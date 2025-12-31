# Close Button

A button for closing dialogs, modals, or dismissible elements.

## Description
The Close Button provides a standard close (×) icon and accessible semantics for dismissing content. Inherits from Base Button.

## API
- **ariaLabel**: `string` — Accessibility label for screen readers.
- **(click)**: `EventEmitter<MouseEvent>` — Emits when the button is clicked.

## Usage
```html
<ng-kit-close-button ariaLabel="Close dialog"></ng-kit-close-button>
```
