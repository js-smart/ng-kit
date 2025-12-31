A wrapper aroung Angular Material spinner component for Angular applications. Provides a simple way to customize size, color, and stroke width. 

## Usage

Import and use `SpinnerComponent` in your standalone component:

```typescript
import { Component } from '@angular/core';
import { SpinnerComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-spinner-demo',
  standalone: true,
  imports: [SpinnerComponent],
  template: `
    <spinner
      [bootstrapSpinner]="true"
      [diameter]="40"
      [color]="'accent'"
      [strokeWidth]="4"
    ></spinner>
  `
})
export class SpinnerDemoComponent {}
```

---

## API Reference

### Selector
- `spinner`
- `lib-spinner`

### Inputs
| Name              | Type           | Default   | Description                                      |
|-------------------|----------------|-----------|--------------------------------------------------|
| `bootstrapSpinner`| boolean        | true      | Use Bootstrap spinner if true, else Material     |
| `diameter`        | number         | 50        | Diameter of Material spinner (px)                |
| `color`           | ThemePalette   | 'primary' | Color of Material spinner ('primary', etc.)      |
| `strokeWidth`     | number         | 5         | Stroke width of Material spinner                 |

---

## Notes
- Set `bootstrapSpinner` to `false` to use Angular Material spinner.
- Tree-shakable: only imported features are included in your bundle.
- Fully configurable for size and color.

---

## Accessibility
Follows Angular Material and WCAG accessibility best practices. Uses semantic HTML and ARIA attributes for spinners.

---

## Troubleshooting
1. Ensure your Angular version is 19 or higher.
2. Check for peer dependency warnings during install.
3. If spinner does not display, verify styles and module imports.
