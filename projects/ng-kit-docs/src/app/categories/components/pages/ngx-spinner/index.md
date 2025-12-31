A overlay spinner component for Angular applications, built on top of the popular `ngx-spinner` library. Provides a simple way to display loading indicators during async operations with customizable options.


## Usage

Import and use `NgxSpinnerComponent` in your standalone component:

```typescript
import { Component } from '@angular/core';
import { NgxSpinnerComponent } from '@js-smart/ng-kit';

@Component({
	selector: 'app-spinner-demo',
	standalone: true,
	imports: [NgxSpinnerComponent],
	template: `
		<ngx-spinner
			[name]="'main'"
			[bdColor]="'rgba(0,0,0,0.8)'"
			[size]="'large'"
			[color]="'#fff'"
			[type]="'ball-spin-clockwise'"
			[fullScreen]="true"
			[zIndex]="9999"
			[template]="''"
			[showSpinner]="true"
			[disableAnimation]="false"
		></ngx-spinner>
	`
})
export class SpinnerDemoComponent {}
```

---

## API Reference

### Selector
- `ngx-spinner`

### Inputs
| Name             | Type      | Default                | Description                                      |
|------------------|-----------|------------------------|--------------------------------------------------|
| `name`           | string    | 'primary-spinner'      | Spinner name (for service control)               |
| `bdColor`        | string    | 'rgba(51,51,51,0.8)'   | Backdrop color (RGBA format)                     |
| `size`           | string    | 'large'                | Spinner size: 'small', 'medium', 'large'         |
| `color`          | string    | '#fff'                 | Spinner color                                    |
| `type`           | string    | 'ball-spin-clockwise'  | Spinner type (see enum for options)              |
| `fullScreen`     | boolean   | true                   | Show spinner fullscreen                          |
| `zIndex`         | number    | 9999                   | z-index value                                    |
| `template`       | string    | ''                     | Custom HTML template for spinner                  |
| `showSpinner`    | boolean   | false                  | Show/hide spinner                                |
| `disableAnimation`| boolean  | false                  | Disable spinner animation                        |

---

## Notes
- Integrates with NgxSpinnerService for programmatic control.
- Multiple spinner types and sizes supported.
- Tree-shakable: only imported features are included in your bundle.
- Use `template` input for custom loader markup.

---

## Accessibility
Follows Angular and WCAG accessibility best practices. Uses semantic HTML and ARIA attributes for overlays and spinners.

---

## Troubleshooting
1. Ensure Compatible Angular version is used.
2. Check for peer dependency warnings during install.
3. If spinner does not display, verify styles and service usage.
## Usage
Import and use `NgxSpinnerComponent` in your standalone component:


