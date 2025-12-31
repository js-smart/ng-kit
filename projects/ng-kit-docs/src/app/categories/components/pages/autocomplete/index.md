
Reusable autocomplete component that xtends Angular Material's MatAutocomplete with clear and arrow icons, custom display mapping, and reactive state via Angular signals. Designed for standalone usage, tree-shakable imports, and accessibility. Supports custom labels, values, appearance, and more.


## Usage

Import and use `AutocompleteComponent` in your standalone component:

```typescript
import { Component } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-autocomplete-demo',
  standalone: true,
  imports: [AutocompleteComponent],
  template: `
    <autocomplete
      [label]="'Search'"
      [placeHolder]="'Type to search...'"
      [appearance]="'fill'"
      [classes]="'my-custom-class'"
      [bindLabel]="'name'"
      [bindValue]="'id'"
      [required]="true"
      [disabled]="false"
      [data]="options"
      [displayWith]="displayFn"
      (onSelectionChange)="onSelected($event)"
    ></autocomplete>
  `
})
export class AutocompleteDemoComponent {
  options = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' }
  ];

  displayFn(option: any): string {
    return option?.name || '';
  }

  onSelected(value: any) {
    // Handle selected value
  }
}
```

---

## API Reference

### Selectors
- `autocomplete`
- `lib-autocomplete`

### Inputs
| Name           | Type                              | Default   | Description                                                                 |
|----------------|-----------------------------------|-----------|-----------------------------------------------------------------------------|
| `label`        | string                            | ''        | Label for the autocomplete input                                            |
| `placeHolder`  | string                            | ''        | Placeholder text                                                            |
| `appearance`   | string                            | 'fill'    | Material appearance style                                                   |
| `classes`      | string                            | ''        | Additional CSS classes                                                      |
| `bindLabel`    | string                            | ''        | Object property to display in dropdown                                      |
| `bindValue`    | string                            | 'id'      | Object property used for value binding                                      |
| `displayWith`  | (value: any) => string            | null      | Custom function to map value to display string                              |
| `required`     | boolean                           | false     | Whether the input is required                                               |
| `disabled`     | boolean                           | false     | Whether the input is disabled                                               |
| `data`         | string[] \| any[]                 | []        | Array of options to display                                                 |

### Output
| Name               | Type    | Description                          |
|--------------------|---------|--------------------------------------|
| `onSelectionChange`| any     | Emits selected value on change       |

---

## Notes
- Extends Angular Material's MatAutocomplete for enhanced UX.
- Supports custom display mapping via `displayWith`.
- All inputs are reactive and support Angular signals.
- Tree-shakable: only imported features are included in your bundle.
- Use `classes` input for custom styles.

---

## Accessibility
Follows Angular Material and WCAG accessibility best practices. Use semantic HTML and ARIA attributes as needed in your templates.

---

## Troubleshooting
1. Ensure your Angular version is 19 or higher.
2. Check for peer dependency warnings during install.
3. If autocomplete does not display, verify Angular Material styles are loaded.
