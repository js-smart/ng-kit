A button styled as the primary action button. The Primary Button extends the Base Button and is styled to stand out as the main action on a page or form. It uses a prominent color and may include an icon.

## Usage

```html group="usage" name="Directive (Preferred)" active
<button ariaLabel="Submit" (click)="onSubmit()" primaryButton>Submit</button>
```

```html group="usage" name="Component"
<primary-button ariaLabel="Submit" (click)="onSubmit()">Submit</primary-button>
```

## API Reference
The Primary Button extends the Base Button and overrides below properties for primary button behavior. See [Base Button](/components/buttons/base-button#api-reference) for inherited properties.

Below are the inputs overridden by the Primary Button.

| Name          | Type    | Default                | Description                    |
|---------------|---------|------------------------|--------------------------------|
| `loadingLabel`| string  | 'Saving...'            | Label to show when loading    |
| `label`       | string  | 'Save'                 | Button label                   |
| `icon`        | string  | 'save'                 | Material icon name to display  |
| `showIcon`    | boolean | false                  | Show/hide icon                 |
| `classes`     | string  | 'btn-primary primary-button' | CSS classes to apply           |
