The Base Button component provides the foundation for all button components in ng-kit. It encapsulates common button logic, accessibility, and styling.

## Description
The Base Button is a reusable, accessible button component that supports custom content, ARIA attributes, and keyboard interactions. All other button components extend this base.


## Usage
The Base Button is not intended to be used directly. Instead, extend it to create custom button components with specific styles and behaviors.

## API Reference
The Base Button component exposes the following inputs and outputs

#### Inputs
All of these are Angular signal inputs.

| Name         | Type                | Default      | Description                                              |
|--------------|---------------------|--------------|----------------------------------------------------------|
| `loading`    | boolean             | false        | Show loading state (disables button, shows spinner)      |
| `disabled`   | boolean             | false        | Disable the button                                       |
| `type`       | 'button' \| 'submit'| 'button'     | Button type attribute                                    |
| `loadingLabel`| string             | 'Saving...'  | Label to show when loading                               |
| `label`      | string              | 'Save'       | Button label                                             |
| `icon`       | string              | 'save'       | Material icon name to display                            |
| `showIcon`   | boolean             | true         | Show/hide icon                                           |
| `style`      | any                 | null         | Inline style object                                      |
| `classes`    | string              | 'btn'        | CSS classes to apply                                     |
| `dataCy`     | string              | 'save-button'| data-cy attribute for testing                            |

#### Outputs
| Name         | Type                | Description                                  |
|--------------|---------------------|----------------------------------------------|
| `onClick`    | MouseEvent          | Emits when button is clicked                 |
| `onFocus`    | FocusEvent          | Emits when button is focused                 |
| `onBlur`     | FocusEvent          | Emits when button is blurred                 |
| `onKeyDown`  | KeyboardEvent       | Emits when key is pressed down on button     |
| `onKeyUp`    | KeyboardEvent       | Emits when key is released on button         |

---

