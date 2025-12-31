A reusable confirmation dialog component built on top of Angular Material's dialog system. Allows users to confirm or cancel actions with customizable title and message.


## Usage

Import and use `ConfirmDialogComponent` with Angular Material's dialog service:

```typescript
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@js-smart/ng-kit';

// ...in your component
constructor(private dialog: MatDialog) {}

openConfirmDialog() {
	const dialogRef = this.dialog.open(ConfirmDialogComponent, {
		data: {
			title: 'Delete Item',
			message: 'Are you sure you want to delete this item?'
		}
	});

	dialogRef.afterClosed().subscribe(result => {
		if (result) {
			// User confirmed
		} else {
			// User cancelled
		}
	});
}
```

---

## API Reference


### Inputs (via MAT_DIALOG_DATA)
| Name      | Type    | Description                      |
|-----------|---------|----------------------------------|
| `title`   | string  | Dialog title                     |
| `message` | string  | Dialog message                   |

### Outputs
- Returns `true` if confirmed, `false` if cancelled (via dialog close result)

---

## Notes
- Uses Angular Material dialog for modal presentation.
- Tree-shakable: only imported features are included in your bundle.
- Customizable title and message via dialog data.

---

## Accessibility
Follows Angular Material and WCAG accessibility best practices. Uses semantic HTML and ARIA attributes for dialogs.

---

## Troubleshooting
1. Ensure correct Angular version is used
2. Check for peer dependency warnings during install.
3. If dialog does not display, verify Angular Material styles are loaded and MatDialogModule is imported.
