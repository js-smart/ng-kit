`progress-util` is a powerful utility library for managing progress states in Angular applications using Angular Signals. It provides a simple and type-safe way to track the loading, success, and error states of asynchronous operations, making it ideal for:

1. **Form submissions** - Track the progress of form save operations
2. **API calls** - Monitor the state of HTTP requests
3. **Data loading** - Manage loading states for data fetching
4. **User feedback** - Display success/error messages based on operation outcomes

The utility uses Angular Signals (`WritableSignal`) to provide reactive state management, ensuring your UI automatically updates when the progress state changes. It provides three core functions to manage the lifecycle of an operation: initialize, mark as loading, mark as success, and mark as error.

## Usage

Import the utility functions from `@js-smart/ng-kit` and use them with Angular Signals.

### Basic Usage

{% raw %}
```typescript
import { Component } from '@angular/core';
import { initializeState, markLoading, markSuccess, markError } from '@js-smart/ng-kit';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="saveData()" [disabled]="progressState().isLoading">
      {{ progressState().isLoading ? 'Saving...' : 'Save' }}
    </button>
    
    @if (progressState().isSuccess) {
      <div class="success">Success! {{ progressState().message }}</div>
    }
    
    @if (progressState().isError) {
      <div class="error">Error: {{ progressState().message }}</div>
    }
  `
})
export class ExampleComponent {
  progressState = initializeState();

  saveData() {
    markLoading(this.progressState);
    
    // Simulate API call
    setTimeout(() => {
      markSuccess(this.progressState, 'Data saved successfully');
    }, 2000);
  }
}
```
{% endraw %}

### With API Calls

{% raw %}
```typescript
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { initializeState, markLoading, markSuccess, markError } from '@js-smart/ng-kit';

@Component({
  selector: 'app-api-example',
  template: `
    <button (click)="loadData()" [disabled]="progressState().isLoading">
      Load Data
    </button>
    
    @if (progressState().isLoading) {
      <div>Loading...</div>
    }
    
    @if (progressState().isSuccess) {
      <div>Success: {{ progressState().message }}</div>
    }
    
    @if (progressState().isError) {
      <div>Error: {{ progressState().message }}</div>
    }
  `
})
export class ApiExampleComponent {
  progressState = initializeState();

  constructor(private http: HttpClient) {}

  loadData() {
    markLoading(this.progressState);
    
    this.http.get('/api/data').subscribe({
      next: () => {
        markSuccess(this.progressState, 'Data loaded successfully');
      },
      error: (error) => {
        markError(this.progressState, error.message || 'Failed to load data');
      }
    });
  }
}
```
{% endraw %}



## API Reference

The progress-util provides the following functions for managing progress states.

| Function           | Parameters                                    | Return Type                    | Description                                                                 |
|--------------------|-----------------------------------------------|--------------------------------|-----------------------------------------------------------------------------|
| `initializeState`  | -                                             | `WritableSignal<ProgressState>`| Initializes and returns a new progress state signal with default values     |
| `markLoading`      | `progressState: WritableSignal<ProgressState>`| void                           | Updates the state to loading, clearing success and error flags             |
| `markSuccess`      | `progressState: WritableSignal<ProgressState>`, `message?: string` | void          | Updates the state to success with an optional success message              |
| `markError`        | `progressState: WritableSignal<ProgressState>`, `message?: string` | void            | Updates the state to error with an optional error message                   |

### Functions

#### `initializeState()`

Creates and returns a new `WritableSignal<ProgressState>` with initial default values.

**Returns**: `WritableSignal<ProgressState>`

**Initial State**:
```typescript
{
  isLoading: false,
  isSuccess: false,
  isError: false,
  isComplete: false,
  message: ''
}
```

**Example:**
```typescript
export class MyComponent {
  progressState = initializeState();
  
  // Access state values
  isCurrentlyLoading = this.progressState().isLoading;
}
```

#### `markLoading(progressState)`

Updates the progress state to indicate that an operation is in progress. This function:
- Sets `isLoading` to `true`
- Sets `isSuccess` to `false`
- Sets `isError` to `false`
- Sets `isComplete` to `false`
- Clears the `message`

**Parameters**:
- `progressState`: `WritableSignal<ProgressState>` - The progress state signal to update

**Example:**
```typescript
markLoading(this.progressState);
// State is now: { isLoading: true, isSuccess: false, isError: false, isComplete: false, message: '' }
```

#### `markSuccess(progressState, message?)`

Updates the progress state to indicate that an operation completed successfully. This function:
- Sets `isLoading` to `false`
- Sets `isSuccess` to `true`
- Sets `isError` to `false`
- Sets `isComplete` to `true`
- Sets the `message` to the provided value (or empty string if not provided)

**Parameters**:
- `progressState`: `WritableSignal<ProgressState>` - The progress state signal to update
- `message?`: `string` (optional) - Success message to display

**Example:**
```typescript
markSuccess(this.progressState, 'Data saved successfully');
// State is now: { isLoading: false, isSuccess: true, isError: false, isComplete: true, message: 'Data saved successfully' }
```

#### `markError(progressState, message?)`

Updates the progress state to indicate that an operation failed. This function:
- Sets `isLoading` to `false`
- Sets `isSuccess` to `false`
- Sets `isError` to `true`
- Sets `isComplete` to `true`
- Sets the `message` to the provided value (or empty string if not provided)

**Parameters**:
- `progressState`: `WritableSignal<ProgressState>` - The progress state signal to update
- `message?`: `string` (optional) - Error message to display

**Example:**
```typescript
markError(this.progressState, 'Failed to save data');
// State is now: { isLoading: false, isSuccess: false, isError: true, isComplete: true, message: 'Failed to save data' }
```

### ProgressState Interface

The `ProgressState` interface defines the structure of the progress state object:

```typescript
export interface ProgressState {
  isLoading: boolean;    // Indicates if an operation is currently in progress
  isSuccess: boolean;      // Indicates if the last operation completed successfully
  isError: boolean;       // Indicates if the last operation failed
  isComplete?: boolean;  // Indicates if the operation has completed (success or error)
  message: string;        // Optional message to display to the user
}
```

**Property Descriptions**:

| Property      | Type    | Description                                                                 |
|---------------|---------|-----------------------------------------------------------------------------|
| `isLoading`  | boolean | `true` when an operation is in progress, `false` otherwise                 |
| `isSuccess`   | boolean | `true` when the last operation completed successfully, `false` otherwise   |
| `isError`     | boolean | `true` when the last operation failed, `false` otherwise                    |
| `isComplete`  | boolean | `true` when the operation has completed (either success or error)          |
| `message`     | string  | User-friendly message describing the current state or outcome                |

## Features

- **Angular Signals Integration**: Built on Angular Signals for reactive state management
- **Type Safe**: Full TypeScript support with proper typing
- **Simple API**: Three simple functions cover all state management needs
- **Immutable Updates**: Uses signal's `update()` method for safe state mutations
- **Flexible Messages**: Optional success and error messages for user feedback
- **Lifecycle Tracking**: Tracks loading, success, error, and completion states
- **Framework Agnostic UI**: Works with any UI framework or component library

## State Transitions

The progress state follows a predictable lifecycle:

1. **Initial State**: All flags are `false`, message is empty
2. **Loading**: `markLoading()` sets `isLoading = true`, clears other flags
3. **Success**: `markSuccess()` sets `isLoading = false`, `isSuccess = true`, `isComplete = true`
4. **Error**: `markError()` sets `isLoading = false`, `isError = true`, `isComplete = true`

**State Flow Diagram**:
```
Initial → Loading → Success/Error → (can return to Loading for new operation)
```

## Notes

- The utility uses Angular Signals, so state changes are automatically reactive
- Always initialize the state using `initializeState()` in your component
- The `message` parameter is optional for both `markSuccess()` and `markError()`
- The state is updated immutably using signal's `update()` method
- You can reset the state by calling `markLoading()` again for a new operation
- The `isComplete` flag is automatically set to `true` when marking success or error
- Works seamlessly with Angular's change detection and OnPush strategy
- Compatible with Angular Material components and custom button components that support loading states
- The state signal can be used directly in templates with the `()` syntax: `progressState().isLoading`

