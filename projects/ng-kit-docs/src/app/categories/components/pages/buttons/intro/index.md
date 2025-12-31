Custom button components build on top of Angular Material buttons. Provides the ability to create different types of buttons with additional styling and features. 

## Base Button
A base button component that provides common functionality and styling for all button types. All buttons extends this base button

## Usage

Button components in ng-kit can be used in two ways: as **directives** (recommended) or as **components** (legacy). The directive approach provides more flexibility and cleaner markup by applying button behavior directly to existing HTML elements.

### Recommended: Using Directives

Directives allow you to apply button styling and behavior to any HTML element. This approach is more flexible and results in cleaner markup.

```html
<!-- Primary Button -->
<button ariaLabel="Submit" (click)="onSubmit()" primaryButton>Submit</button>

<!-- Delete Button -->
<button ariaLabel="Delete item" (click)="onDelete()" deleteButton>Delete</button>

<!-- Edit Button -->
<button ariaLabel="Edit item" (click)="onEdit()" editButton>Edit</button>
```

### Legacy: Using Components

The component approach uses dedicated Angular components that wrap Angular Material buttons. While still supported, the directive approach is preferred for new implementations.

```html
<!-- Primary Button -->
<primary-button ariaLabel="Submit" (click)="onSubmit()">Submit</primary-button>

<!-- Delete Button -->
<delete-button ariaLabel="Delete item" (click)="onDelete()"></delete-button>

<!-- Edit Button -->
<edit-button ariaLabel="Edit item" (click)="onEdit()"></edit-button>
```


## Available Buttons
Here are the available buttons in the library.
- [Base Button](components/buttons/base-button)
- [Bootstrap Link Button](components/buttons/bs-link-button)
- [Close Button](components/buttons/close-button)
- [Delete Button](components/buttons/delete-button)
- [Edit Bootstrap Button](components/buttons/edit-bs-button)
- [Edit Button](components/buttons/edit-button)
- [Edit SVG Icon Button](components/buttons/edit-svg-icon-button)
- [Excel Export Button](components/buttons/excel-export-button)
- [Manage Button](components/buttons/manage-button)
- [PDF Export Button](components/buttons/pdf-export-button)
- [Primary Button](components/buttons/primary-button)
- [Save Primary Button](components/buttons/save-primary-button)
- [Search Button](components/buttons/search-button)
- [Success Button](components/buttons/success-button)
- [View Button](components/buttons/view-button)
- [View Primary Button](components/buttons/view-primary-button)
