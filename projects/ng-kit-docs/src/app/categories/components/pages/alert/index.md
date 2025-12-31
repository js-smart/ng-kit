Reusable alert component created with Bootstrap 5+ and Angular 19 or higher. This component provides a simple way to display alert messages with various styles and options.


## Usage
Import the `AlertComponent` into your Angular module or standalone component:

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

## API
### Selectors
List of selectors that can be used to select the component
- `alert`
- `lib-alert`

### Properties


| Property         | Description                                                                                                | Type             | Default Value |
|------------------|------------------------------------------------------------------------------------------------------------|------------------|---------------|
| dismissible      | If set, displays an inline "Close" button                                                                  | boolean          | false         |
| dismissOnTimeout | If set, dismisses the alert after Dismiss Timeout                                                          | boolean          | true          |
| dismissTimeout   | Number in milliseconds, after which alert will be closed                                                   | string or number | 5000          |
| isOpen           | Is alert visible                                                                                           | boolean          | false         |
| type             | Alert type. Provides one of four bootstrap supported contextual classes: success, info, warning and danger | string           | info          |
