A button for delete actions, often styled with a danger color and icon. The Delete Button extends the Base Button and is used to trigger destructive actions. It typically displays a trash or delete icon and uses a warning color.

## Usage

### Recommended: Using Directive

```html
<button ariaLabel="Delete item" (click)="onDelete()" deleteButton>Delete</button>
```

### Legacy: Using Component

```html
<delete-button ariaLabel="Delete item" (click)="onDelete()"></delete-button>
```


## API Reference
The Delete Button extends the Base Button and overrides below properties for delete behavior. See [Base Button](/components/buttons/base-button#api-reference) for inherited properties.

Below are the inputs overridden by the Delete Button.

| Name         | Type                | Default      | Description                                              |
|--------------|---------------------|--------------|----------------------------------------------------------|
| `loadingLabel`| string             | 'Deleting...'  | Label to show when deleting                               |
| `label`      | string              | 'Delete'     | Button label                                             |
| `icon`       | string              | 'delete'     | Material icon name to display                            |
| `classes`    | string              | 'delete-button'| CSS classes to apply                                     |
