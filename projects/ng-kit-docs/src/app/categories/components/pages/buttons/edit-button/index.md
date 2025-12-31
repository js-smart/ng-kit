A button for edit actions, typically with a pencil or edit icon. The Edit Button extends the Base Button and is used to trigger editing of content. It is styled to indicate an edit action and is accessible.

## Usage

```html group="usage" name="Directive (Preferred)" active
<button ariaLabel="Edit item" (click)="onEdit()" editButton>Edit</button>
```

```html group="usage" name="Component"
<edit-button ariaLabel="Edit item" (click)="onEdit()"></edit-button>
```

## API Reference
The Edit Button extends the Base Button and overrides below properties for edit behavior. See [Base Button](/components/buttons/base-button#api-reference) for inherited properties.

Below are the inputs overridden by the Edit Button.

| Name      | Type   | Default         | Description                    |
|-----------|--------|-----------------|--------------------------------|
| `label`   | string | 'Edit'          | Button label                   |
| `icon`    | string | 'edit'          | Material icon name to display  |
| `classes` | string | 'primary-button'| CSS classes to apply           |
