

Fully customizable, reusable alert component for Angular, uses Bootstrap CSS for styling. Designed for standalone usage, tree-shakable imports, and reactive state via Angular signals. Easily configure alert type, visibility, dismiss behavior, and custom classes. Follows WCAG and Angular accessibility best practices


## Usage

Import and use `AlertComponent` in your standalone component:

```typescript
import { Component } from '@angular/core';
import { AlertComponent } from '@js-smart/ng-kit';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [AlertComponent],
  template: `
    <alert
      [type]="'success'"
      [isOpen]="true"
      [dismissible]="true"
      [dismissOnTimeout]="true"
      [dismissTimeout]="5000"
      [class]="'my-custom-class'"
      (closed)="onClosed()"
    >
      This is a success alert—check it out!
    </alert>
  `
})
export class AlertDemoComponent {
  onClosed() {
    // Handle alert closed event
  }
}
```

---

## API Reference

### Selectors
- `alert`
- `lib-alert`

### Inputs
| Name              | Type                | Default   | Description                                                                                   |
|-------------------|---------------------|-----------|-----------------------------------------------------------------------------------------------|
| `type`            | AlertType           | 'info'    | Alert style: 'info', 'primary', 'secondary', 'success', 'warning', 'danger', 'dark', 'light' |
| `isOpen`          | boolean             | true      | Is alert visible                                                                              |
| `dismissible`     | boolean             | true      | Show inline "Close" button                                                                    |
| `dismissOnTimeout`| boolean             | true      | Dismiss alert after timeout                                                                   |
| `dismissTimeout`  | number              | 5000      | Timeout in ms before auto-dismiss                                                             |
| `class`           | string              | ''        | Additional CSS classes                                                                        |

### Output
| Name      | Type    | Description                      |
|-----------|---------|----------------------------------|
| `closed`  | void    | Emits when alert is closed       |

---

## Notes
- The alert is tree-shakable: only imported features are included in your bundle.
- All inputs are reactive and support Angular signals.
- For more customization, use the `class` input to add custom styles.

---

## Accessibility
Follows Bootstrap and Angular accessibility best practices. Use semantic HTML and ARIA attributes as needed in your templates.

---

## Troubleshooting
1. Ensure your Angular version is 19 or higher.
2. Check for peer dependency warnings during install.
3. If alerts do not display, verify your Bootstrap styles are loaded.
