A button styled to indicate a successful or positive action. The Success Button extends the Base Button and is styled with a success color, typically green. It is used for actions that result in a positive outcome.

## Usage
```html
<success-button ariaLabel="Success" (click)="onSuccess()">Success</success-button>
```

## API Reference
The Success Button extends the Base Button and overrides below properties for success behavior. See [Base Button](/components/buttons/base-button#api-reference) for inherited properties.

Below are the inputs overridden by the Success Button.

| Name          | Type   | Default      | Description                    |
|---------------|--------|--------------|--------------------------------|
| `loadingLabel`| string | 'Updating...'| Label to show when updating   |
| `label`       | string | 'Update'     | Button label                   |
| `icon`        | string | 'save'       | Material icon name to display  |
| `classes`     | string | 'success-button' | CSS classes to apply           |
