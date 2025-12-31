A primary-styled button for view or details actions. The View Primary Button extends the Base Button and is styled as a primary action. It is used for prominent view or details actions, often with an eye icon and primary color.

## Usage
```html
<view-primary-button ariaLabel="View details" (click)="onView()">View</view-primary-button>
```

## API Reference
The View Primary Button extends the Base Button and overrides below properties for view behavior. See [Base Button](/components/buttons/base-button#api-reference) for inherited properties.

Below are the inputs overridden by the View Primary Button.

| Name      | Type   | Default                | Description                    |
|-----------|--------|------------------------|--------------------------------|
| `label`   | string | 'View'                 | Button label                   |
| `icon`    | string | 'visibility'           | Material icon name to display  |
| `classes` | string | 'btn-primary primary-button' | CSS classes to apply           |
