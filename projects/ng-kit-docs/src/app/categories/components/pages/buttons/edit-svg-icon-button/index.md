A button for edit actions using a custom SVG icon. The Edit SVG Icon Button extends the Base Button and displays a custom SVG icon for edit actions. Useful for consistent iconography across your app.

## Usage

### Recommended: Using Directive

```html
<button ariaLabel="Edit item" (click)="onEdit()" editSvgIconButton>Edit</button>
```

### Legacy: Using Component

```html
<edit-svg-icon-button ariaLabel="Edit item" (click)="onEdit()"></edit-svg-icon-button>
```

## API Reference
The Edit SVG Icon Button extends the Base Button and overrides below properties for edit behavior. See [Base Button](/components/buttons/base-button#api-reference) for inherited properties.

Below are the inputs overridden by the Edit SVG Icon Button.

| Name      | Type   | Default         | Description                    |
|-----------|--------|-----------------|--------------------------------|
| `label`   | string | 'Edit'          | Button label                   |
| `icon`    | string | 'edit'          | Material icon name to display  |
| `classes` | string | 'primary-button'| CSS classes to apply           |
