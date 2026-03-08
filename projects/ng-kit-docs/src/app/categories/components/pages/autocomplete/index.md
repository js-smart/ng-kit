
Reusable autocomplete component that extends Angular Material's MatAutocomplete with clear and arrow icons, custom display mapping, and reactive state via Angular signals. Designed for standalone usage, tree-shakable imports, and accessibility. Supports custom labels, values, appearance, loading states, disabled states, and more.


## Usage

Import and use `AutocompleteComponent` in your standalone component:

```typescript
import { Component } from '@angular/core';
import { AutocompleteComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-autocomplete-demo',
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

## Loading State

Show a spinner and message while data is being fetched asynchronously:

```typescript
@Component({
  selector: 'app-loading-demo',
  imports: [AutocompleteComponent],
  template: `
    <autocomplete
      [data]="cities()"
      [loading]="isLoading()"
      [displayWith]="displayFn"
      loadingText="Fetching cities..."
      bindLabel="name"
      bindValue="id"
      label="City"
      placeHolder="Select City"
    ></autocomplete>
  `
})
export class LoadingDemoComponent {
  isLoading = signal(true);
  cities = signal<any[]>([]);

  constructor() {
    // Simulate async data loading
    setTimeout(() => {
      this.cities.set([
        { id: 1, name: 'New York' },
        { id: 2, name: 'Boston' },
      ]);
      this.isLoading.set(false);
    }, 3000);
  }

  displayFn(option: any): string {
    return option?.name || '';
  }
}
```

---

## Disabled State

Disable the autocomplete via reactive forms. When disabled, the clear and arrow buttons are automatically hidden:

```typescript
@Component({
  selector: 'app-disabled-demo',
  imports: [AutocompleteComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <autocomplete
        [data]="options"
        [displayWith]="displayFn"
        bindLabel="name"
        bindValue="id"
        formControlName="city"
        label="City"
      ></autocomplete>
    </form>
    <button (click)="toggleDisabled()">
      {{ form.get('city')?.disabled ? 'Enable' : 'Disable' }}
    </button>
  `
})
export class DisabledDemoComponent {
  options = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'Boston' },
  ];

  form = this.fb.group({
    city: new FormControl({ value: this.options[0], disabled: true }),
  });

  constructor(private fb: FormBuilder) {}

  displayFn(option: any): string {
    return option?.name || '';
  }

  toggleDisabled(): void {
    const control = this.form.get('city');
    control?.disabled ? control.enable() : control?.disable();
  }
}
```

---

## No Options Text

Customize the message shown when no options match the user's input:

```html
<autocomplete
  [data]="options"
  noOptionsText="No results found"
  label="Search"
></autocomplete>
```

---

## API Reference

### Selectors
- `autocomplete`
- `lib-autocomplete`

### Inputs
| Name             | Type                              | Default        | Description                                                                 |
|------------------|-----------------------------------|----------------|-----------------------------------------------------------------------------|
| `label`          | string                            | ''             | Label for the autocomplete input                                            |
| `placeHolder`    | string                            | ''             | Placeholder text                                                            |
| `appearance`     | `'fill'` \| `'outline'`          | `'fill'`       | Material appearance style                                                   |
| `classes`        | string                            | ''             | Additional CSS classes                                                      |
| `bindLabel`      | string                            | ''             | Object property to display in dropdown                                      |
| `bindValue`      | string                            | `'id'`         | Object property used for value binding and tracking                         |
| `displayWith`    | `(value: any) => string`          | `null`         | Custom function to map value to display string                              |
| `required`       | boolean                           | `false`        | Whether the input is required                                               |
| `disabled`       | boolean                           | `false`        | Whether the input is disabled                                               |
| `loading`        | boolean                           | `false`        | Whether to show a loading spinner instead of options                        |
| `loadingText`    | string                            | `'Loading...'` | Text displayed next to the spinner during loading state                     |
| `noOptionsText`  | string                            | `'No options'` | Text displayed when no options match the input                              |
| `data`           | `string[]` \| `any[]`            | `undefined`    | Array of options to display                                                 |

### Outputs
| Name               | Type    | Description                          |
|--------------------|---------|--------------------------------------|
| `onSelectionChange`| any     | Emits selected value on change       |

### Types
| Name                 | Definition                  | Description                                           |
|----------------------|-----------------------------|-------------------------------------------------------|
| `AutocompleteOption` | `Record<string, any>`       | Type for object options, exported for consumer use     |

---

## Notes
- Extends Angular Material's MatAutocomplete for enhanced UX.
- Supports custom display mapping via `displayWith`.
- All inputs are reactive and support Angular signals.
- Tree-shakable: only imported features are included in your bundle.
- Use `classes` input for custom styles.
- When disabled via reactive forms, clear and arrow buttons are automatically hidden.
- The `loading` state shows a Material spinner with customizable text.
- The `noOptionsText` is displayed when filtering results in an empty list.

---

## Accessibility
Follows Angular Material and WCAG accessibility best practices. Clear and toggle buttons include `aria-label` attributes. When disabled, interactive elements are hidden to prevent confusing screen reader behavior.

---

## Troubleshooting
1. Ensure your Angular version is 19 or higher.
2. Check for peer dependency warnings during install.
3. If autocomplete does not display, verify Angular Material styles are loaded.
4. If the loading spinner does not appear, ensure `MatProgressSpinnerModule` styles are available (included automatically when using Angular Material's theme).
