
Reusable autocomplete component that extends Angular Material's MatAutocomplete with clear and arrow icons, custom display mapping, and reactive state via Angular signals. Designed for standalone usage, tree-shakable imports, and accessibility. Supports custom labels, values, appearance, loading states, disabled states, and more.


## Usage

{{ NgDocActions.demo("AutocompleteOpenInStackblitzComponent", { container: false }) }}

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
      [placeholder]="'Type to search...'"
      [appearance]="'fill'"
      [classes]="'my-custom-class'"
      [options]="options"
      [displayWith]="displayFn"
      (selectionChange)="onSelected($event)"
    ></autocomplete>
  `
})
export class AutocompleteDemoComponent {
  options = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' }
  ];

  displayFn = (option: any): string => {
    return option?.name || '';
  };

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
      [options]="cities()"
      [loading]="isLoading()"
      [displayWith]="displayFn"
      loadingText="Fetching cities..."
      label="City"
      placeholder="Select City"
    ></autocomplete>
  `
})
export class LoadingDemoComponent {
  isLoading = signal(true);
  cities = signal<any[]>([]);

  displayFn = (option: any): string => {
    return option?.name || '';
  };

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
}
```

---

## Disabled State

Disable the autocomplete via reactive forms:

```typescript
@Component({
  selector: 'app-disabled-demo',
  imports: [AutocompleteComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <autocomplete
        [options]="options"
        [displayWith]="displayFn"
        formControlName="city"
        label="City"
      ></autocomplete>
    </form>
    <button (click)="toggleDisabled()">
      {% raw %}{{ form.get('city')?.disabled ? 'Enable' : 'Disable' }}{% endraw %}
    </button>
  `
})
export class DisabledDemoComponent {
  options = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'Boston' },
  ];

  displayFn = (option: any): string => {
    return option?.name || '';
  };

  form = this.fb.group({
    city: new FormControl({ value: this.options[0], disabled: true }),
  });

  constructor(private fb: FormBuilder) {}

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
  [options]="options"
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
| Name             | Type                              | Default          | Description                                                                 |
|------------------|------------------------------------|-------------------|-------------------------------------------------------------------------------|
| `label`          | string                             | `'Select Value'`  | Label for the autocomplete input                                            |
| `placeholder`    | string                             | `''`               | Placeholder text                                                            |
| `appearance`     | `MatFormFieldAppearance`          | `'outline'`        | Material appearance style                                                   |
| `classes`        | string                             | `''`               | Additional CSS classes                                                      |
| `options`        | `T[]`                               | `[]`                | Array of options to display in the dropdown                                 |
| `displayWith`    | `(value: T) => string`             | `String(value)`    | Function that maps an option to its display string                         |
| `loading`        | boolean                            | `false`            | Whether to show a loading spinner instead of options                        |
| `loadingText`    | string                             | `'Loading...'`     | Text displayed when the autocomplete is in a loading state                  |
| `noOptionsText`  | string                             | `'No values found'`| Text displayed when no options match the filter input                       |

### Outputs
| Name               | Type    | Description                                       |
|--------------------|---------|----------------------------------------------------|
| `selectionChange`  | `T`     | Emits the selected value when an option is picked   |
| `onInputChange`    | string  | Emits the raw filter text on each keystroke          |

---

## Notes
- Extends Angular Material's MatAutocomplete for enhanced UX.
- Supports custom display mapping via `displayWith`.
- All inputs are reactive and support Angular signals.
- Tree-shakable: only imported features are included in your bundle.
- Use `classes` input for custom styles.
- Implements Angular's `ControlValueAccessor`, so `[disabled]`/`disable()`/`enable()` work through a `FormControl` rather than a `disabled` input.
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
