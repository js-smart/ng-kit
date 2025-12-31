Install the library via npm or pnpm or yarn:

```bash
npm i @js-smart/ng-kit
```

Or

```bash
pnpm i @js-smart/ng-kit
```

Or

```bash
yarn add @js-smart/ng-kit
```

## Requirements

- **Angular**: 19.x / 20.x / 21.x
- **RxJS**: 7.x

# Usage

**ng-kit** is modular by design. Import the components that you need. Here is an example to load Primary Button

### Example

```typescript
import { Component } from '@angular/core';
import {ViewPrimaryButtonDirective} from '@js-smart/ng-kit';

@Component({
  selector: 'app-component',
  template: `
    <button [loading]="loading()" (click)="setLoading()" primaryButton mat-raised-button class="m-3">Edit</button>
  `,
  imports: [ViewPrimaryButtonDirective]
})
export class AppComponent {
}

```

Since the library is tree-shakable, only the features you actually import will be included in your final bundle.

# Troubleshooting

If you run into issues:
1. Check that your Angular version is compatible.
2. Try clearing your `node_modules` and reinstalling.
3. Check for any peer dependency warnings during installation.

