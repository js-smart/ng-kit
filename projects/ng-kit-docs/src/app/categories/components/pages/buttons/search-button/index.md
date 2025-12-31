A button for search actions, often with a magnifier icon. The Search Button extends the Base Button and is used to trigger search actions. It is styled with a search icon and is accessible.

## Usage
```html
<search-button ariaLabel="Search" (click)="onSearch()"></search-button>
```

## API Reference
The Search Button extends the Base Button and overrides below properties for search behavior. See [Base Button](/components/buttons/base-button#api-reference) for inherited properties.

Below are the inputs overridden by the Search Button.

| Name          | Type   | Default                | Description                    |
|---------------|--------|------------------------|--------------------------------|
| `loadingLabel`| string | 'Searching...'         | Label to show when searching  |
| `label`       | string | 'Search'               | Button label                   |
| `icon`        | string | 'search'               | Material icon name to display  |
| `classes`     | string | 'btn-primary primary-button' | CSS classes to apply           |
