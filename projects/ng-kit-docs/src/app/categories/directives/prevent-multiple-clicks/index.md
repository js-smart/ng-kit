`preventMultipleClicks` is a powerful Angular directive that prevents accidental multiple clicks on interactive elements. It uses RxJS throttling to ensure that only one click event is processed within a specified time period, making it ideal for:

1. **Form submissions** - Preventing duplicate form submissions
2. **API calls** - Avoiding multiple simultaneous API requests
3. **Navigation** - Preventing multiple navigation triggers
4. **Button actions** - Ensuring actions are only executed once per time period

The directive intercepts click events, prevents default behavior and event propagation, then throttles the events before emitting them through an output. This ensures that rapid clicks are ignored until the throttle period expires, providing a robust solution for preventing duplicate actions in your application.

## Usage

The directive can be applied to any clickable element using the `preventMultipleClicks` attribute selector.

### Basic Usage

```html
<button preventMultipleClicks (throttleClick)="onSubmit()">
  Submit Form
</button>
```

### With Custom Throttle Time

```html
<button 
  preventMultipleClicks 
  [throttleTime]="5000"
  (throttleClick)="onSave()">
  Save (5 second throttle)
</button>
```

### With Button Component

```html
<view-button 
  label="Throttle Button" 
  preventMultipleClicks
  (throttleClick)="handleClick()">
</view-button>
```

### With Link Elements

```html
<a 
  href="/path" 
  preventMultipleClicks
  (throttleClick)="navigate()">
  Navigate
</a>
```

### With Form Submit

```html
<form>
  <button 
    type="submit"
    preventMultipleClicks
    (throttleClick)="submitForm($event)">
    Submit
  </button>
</form>
```

## API Reference

The preventMultipleClicks directive provides the following inputs and outputs for configuring click throttling behavior.

| Name           | Type   | Default | Description                                                                 |
|----------------|--------|---------|-----------------------------------------------------------------------------|
| `throttleTime` | number | 2000    | Time in milliseconds to throttle clicks. Only one click will be processed within this period |
| `throttleClick`| Event  | -       | Output event that emits the click event after the throttle period expires   |

### Inputs

#### `throttleTime`

- **Type**: `number`
- **Default**: `2000` (2 seconds)
- **Description**: Specifies the minimum time interval in milliseconds between processed clicks. Any clicks that occur within this period after the first click will be ignored.

**Example:**
```html
<!-- Throttle for 1 second -->
<button preventMultipleClicks [throttleTime]="1000" (throttleClick)="handleClick()">
  Click Me
</button>

<!-- Throttle for 5 seconds -->
<button preventMultipleClicks [throttleTime]="5000" (throttleClick)="handleClick()">
  Click Me
</button>
```

### Outputs

#### `throttleClick`

- **Type**: `Event`
- **Description**: Emits the original click event after the throttle period has elapsed. This event is only emitted once per throttle period, even if multiple clicks occur.

**Example:**
```typescript
handleClick(event: Event): void {
  console.log('Click processed:', event);
  // Your click handling logic here
}
```

## How It Works

1. **Click Interception**: When a click occurs, the directive intercepts it using `@HostListener('click')`
2. **Event Prevention**: The directive calls `preventDefault()` and `stopPropagation()` to prevent the default behavior and stop event bubbling
3. **Event Buffering**: The click event is added to an RxJS `Subject` stream
4. **Throttling**: The stream is piped through `throttleTime()` operator, which ensures only one event is emitted per throttle period
5. **Event Emission**: After the throttle period, the event is emitted through the `throttleClick` output
6. **Cleanup**: The subscription is properly cleaned up when the directive is destroyed

## Features

- **Configurable Throttle Time**: Set custom throttle intervals based on your needs
- **Event Prevention**: Automatically prevents default behavior and stops event propagation
- **RxJS Integration**: Uses RxJS operators for reliable throttling
- **Memory Safe**: Properly unsubscribes from observables on directive destruction
- **Universal Application**: Works with any clickable element (buttons, links, divs, etc.)
- **Type Safe**: Full TypeScript support with proper event typing

## Use Cases

### Preventing Duplicate Form Submissions

```html
<form>
  <button 
    type="submit"
    preventMultipleClicks
    [throttleTime]="3000"
    (throttleClick)="submitForm()">
    Submit
  </button>
</form>
```

### Preventing Multiple API Calls

```html
<button 
  preventMultipleClicks
  [throttleTime]="2000"
  (throttleClick)="loadData()">
  Load Data
</button>
```

### Navigation Protection

```html
<a 
  routerLink="/dashboard"
  preventMultipleClicks
  (throttleClick)="navigate()">
  Go to Dashboard
</a>
```

## Notes

- The directive selector is `[preventMultipleClicks]`, so it can be applied to any HTML element
- The default throttle time is 2000ms (2 seconds)
- The directive automatically prevents default behavior and stops event propagation
- All clicks within the throttle period are ignored except the first one
- The directive properly cleans up subscriptions when destroyed, preventing memory leaks
- The `throttleClick` event emits the original DOM event, so you can access all event properties
- Works with both template-driven and reactive forms
- Compatible with Angular Material components and custom button components

