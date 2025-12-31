A button for management actions, such as opening settings or admin panels. The Manage Button extends the Base Button and is styled for actions related to management or administration. It may include a gear or settings icon.

## Usage

```html group="usage" name="Directive (Preferred)" active
<button ariaLabel="Manage settings" (click)="onManage()" manageButton>Manage</button>
```

```html group="usage" name="Component"
<manage-button ariaLabel="Manage settings" (click)="onManage()"></manage-button>
```

## API Reference
The Manage Button extends the Base Button and overrides below properties for management behavior. See [Base Button](/components/buttons/base-button#api-reference) for inherited properties.

Below are the inputs overridden by the Manage Button.

| Name      | Type   | Default                              | Description                    |
|-----------|--------|--------------------------------------|--------------------------------|
| `label`   | string | 'Manage'                             | Button label                   |
| `icon`    | string | 'settings'                           | Material icon name to display  |
| `classes` | string | 'mr-3 btn btn-secondary secondary-button' | CSS classes to apply           |
