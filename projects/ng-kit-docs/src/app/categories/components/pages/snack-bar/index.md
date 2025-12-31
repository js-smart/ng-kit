A custom snack bar service that is built on top of Angular Material's snack bar component. 

## Usage
Inject `SnackBarService` in your component. Call its methods to show snack bars:
- `mdc.success("YOUR MESSAGE")`: Show a success snack bar.
- `mdc.error("YOUR MESSAGE")`: Show an error snack bar.

### Example
```typescript
import { Component, inject } from '@angular/core';
import { MatSnackBarService } from '@js-smart/ng-kit';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'ng-kit-snack-bar-demo',
	imports: [MatSnackBarModule, MatButtonModule],
	providers: [MatSnackBarService],
	template: `
		<div class="center_div">
			<button mat-raised-button color="primary" (click)="mdc.success('Update Success')">Show Success Snack Bar</button>
			<button style="margin-left: 30px" mat-raised-button color="warn" (click)="mdc.error('Failed to update the record')">
				Show Error Snack Bar
			</button>
		</div>
	`,
})
export class SnackBarDemoComponent {
	mdc = inject(MatSnackBarService);
}
```
