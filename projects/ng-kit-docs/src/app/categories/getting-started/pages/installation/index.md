
Install **@js-smart/ng-kit** using your preferred package manager:

```bash
# npm
npm install @js-smart/ng-kit

# pnpm
pnpm add @js-smart/ng-kit

# yarn
yarn add @js-smart/ng-kit
```

## Prerequisites

**@js-smart/ng-kit** requires:
- **Angular**: Version 19 or later
- **RxJS**: Version 7.x
- **Bootstrap**: Version 5.x (if using)
- **Angular Material**: Required for Material-based components

## Compatibility Matrix

**@js-smart/ng-kit** follows Angular semantic versioning. Use the ng-kit version that matches your Angular version:

| Angular Version | Libary Version | Status |
|-----------------|----------------|--------|
| 21.x            | 21.x           | ✅ Supported |
| 20.x            | 20.x           | ✅ Supported |
| 19.x            | 19.x           | ✅ Supported |

**Note**: Always install the ng-kit version that matches your Angular major version. Minor and patch versions within the same major version are compatible.

## Usage Example

**ng-kit** is fully modular and tree-shakable. Import only the features you need. Here's how to use the Primary Button Directive in a standalone component:
{% raw %}
```typescript
import { Component, signal } from '@angular/core';
import { PrimaryButtonDirective } from '@js-smart/ng-kit';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [PrimaryButtonDirective, MatButtonModule],
  template: `
    <button
      [disabled]="loading()"
      (click)="handleClick()"
      primaryButton
      mat-raised-button>
      {{ loading() ? 'Loading...' : 'Submit' }}
    </button>
  `
})
export class AppComponent {
  loading = signal(false);

  handleClick() {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 3000);
  }
}
```
{% endraw %}

## Troubleshooting

If you encounter issues during installation or usage:

1. **Version Compatibility**: Ensure your Angular version is 19 or later
2. **Peer Dependencies**: Check for peer dependency warnings during install and ensure all required packages are installed
3. **Clean Install**: Delete `node_modules` and lock files, then reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
4. **Bootstrap Styles**: Verify Bootstrap CSS is properly imported if components appear unstyled
5. **Angular Material**: Ensure Angular Material is installed if using Material-based components
6. **TypeScript Errors**: Ensure you're using a compatible TypeScript version (check Angular requirements)
7. **Update Guide**: Review the [Angular Update Guide](https://update.angular.io/) for breaking changes between versions

## Next Steps

- Explore the [Components](/components) section for available UI components
- Check out [Directives](/directives) for interactive directives
- Review [Utilities](/utilities) for helper functions and state management
- See the [Introduction](/getting-started/introduction) for an overview of key features

