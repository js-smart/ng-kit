A button for edit actions using the Material `edit_square` icon. The Edit SVG Icon Button extends the Base Button and is useful for consistent edit iconography across your app.

## Usage

```html group="usage" name="Directive (Preferred)" active
<button ariaLabel="Edit item" (click)="onEdit()" editSvgIconButton>Edit</button>
```

```html group="usage" name="Component"
<edit-svg-icon-button ariaLabel="Edit item" (click)="onEdit()"></edit-svg-icon-button>
```

## API Reference
The Edit SVG Icon Button extends the Base Button and overrides below properties for edit behavior. See [Base Button](/components/buttons/base-button#api-reference) for inherited properties.

Below are the inputs overridden by the Edit SVG Icon Button.

| Name      | Type   | Default         | Description                    |
|-----------|--------|-----------------|--------------------------------|
| `label`   | string | 'Edit'          | Button label                   |
| `icon`    | string | 'edit_square'   | Material icon name to display  |
| `classes` | string | 'primary-button'| CSS classes to apply           |
