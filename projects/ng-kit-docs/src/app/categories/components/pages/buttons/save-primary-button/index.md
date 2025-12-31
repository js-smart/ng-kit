A primary button for save actions, styled to indicate importance. The Save Primary Button extends the Base Button and is used for save actions. It is styled to stand out and may include a save icon.

## Usage

### Recommended: Using Directive

```html
<button ariaLabel="Save" (click)="onSave()" savePrimaryButton>Save</button>
```

### Legacy: Using Component

```html
<save-primary-button ariaLabel="Save" (click)="onSave()">Save</save-primary-button>
```

## API Reference
The Save Primary Button extends the Base Button and overrides below properties for save behavior. See [Base Button](/components/buttons/base-button#api-reference) for inherited properties.

Below are the inputs overridden by the Save Primary Button.

| Name          | Type   | Default                | Description                    |
|---------------|--------|------------------------|--------------------------------|
| `loadingLabel`| string | 'Saving...'            | Label to show when saving      |
| `label`       | string | 'Save'                 | Button label                   |
| `icon`        | string | 'save'                 | Material icon name to display  |
| `classes`     | string | 'btn-primary primary-button' | CSS classes to apply           |
