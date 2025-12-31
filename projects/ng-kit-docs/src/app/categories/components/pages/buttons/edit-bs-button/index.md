A Bootstrap-styled button for edit actions, often with a pencil icon. The Edit BS Button extends the Base Button and is styled for edit actions, using Bootstrap conventions. It is commonly used to trigger editing of items in lists or tables.

## Usage
```html
<edit-bs-button ariaLabel="Edit item" (click)="onEdit()"></edit-bs-button>
```

## API Reference
The Edit BS Button extends the Base Button and overrides below properties for edit behavior. See [Base Button](/components/buttons/base-button#api-reference) for inherited properties.

Below are the inputs overridden by the Edit BS Button.

| Name      | Type   | Default      | Description                    |
|-----------|--------|--------------|--------------------------------|
| `label`   | string | 'Edit'       | Button label                   |
| `classes` | string | 'text-primary' | CSS classes to apply           |
