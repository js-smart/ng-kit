A button for view or details actions, often with an eye icon. The View Button extends the Base Button and is used to trigger view or details actions. It is styled with an eye icon and is accessible.

## Usage

This component is not intended to be used directly. Use the directive or extended button components instead.

### Recommended: Using Directive

```html
<button ariaLabel="View details" (click)="onView()" viewButton>View</button>
```

### Legacy: Using Component

This component should not be used directly. Use `view-primary-button` instead.

## API Reference
The View Button extends the Base Button and overrides below properties for view behavior. See [Base Button](/components/buttons/base-button#api-reference) for inherited properties.

Below are the inputs overridden by the View Button.

| Name      | Type   | Default      | Description                    |
|-----------|--------|--------------|--------------------------------|
| `label`   | string | 'View'       | Button label                   |
| `icon`    | string | 'visibility' | Material icon name to display  |
