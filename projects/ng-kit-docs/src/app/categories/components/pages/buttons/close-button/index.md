A button for closing dialogs, modals, or dismissible elements. The Close Button provides a standard close (×) icon and accessible semantics for dismissing content. Inherits from Base Button.

## API Reference
The Close Button extends the Base Button and includes additional properties for close behavior. See [Base Button](/components/buttons/base-button#api-reference) for inherited properties.

- **ariaLabel**: `string` — Accessibility label for screen readers.
- **(click)**: `EventEmitter<MouseEvent>` — Emits when the button is clicked.

## Usage

### Using Directive

The Close Button is only available as a directive.

```html
<button ariaLabel="Close dialog" closeButton>×</button>
```
