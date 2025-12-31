


**ng-kit** supports Angular 19, 20, and 21. Requires RxJS 7.x. Install with your preferred package manager:

```bash
# npm
npm install @js-smart/ng-kit

# pnpm
pnpm add @js-smart/ng-kit

# yarn
yarn add @js-smart/ng-kit
```

---

# Usage Example

**ng-kit** is fully modular and tree-shakable. Import only the features you need.

Here’s how to use the Primary Button Directive in a standalone component:

```typescript
import { Component, signal } from '@angular/core';
import { ViewPrimaryButtonDirective } from '@js-smart/ng-kit';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [ViewPrimaryButtonDirective],
  template: `
    <button
      [loading]="loading()"
      (click)="setLoading()"
      primaryButton
      mat-raised-button
      class="m-3"
    >Edit</button>
  `
})
export class AppComponent {
  loading = signal(false);

  setLoading() {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 3000);
  }
}
```

---

# Troubleshooting

If you encounter issues:

1. Ensure your Angular version is supported.
2. Delete `node_modules` and reinstall dependencies.
3. Check for peer dependency warnings during install.
4. Review the [Angular Update Guide](https://update.angular.io/) for breaking changes.

---

For more examples and advanced usage, see the documentation sections in this guide.

