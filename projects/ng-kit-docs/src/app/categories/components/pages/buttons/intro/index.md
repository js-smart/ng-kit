Custom button components build on top of Angular Material buttons. Provides the ability to create different types of buttons with additional styling and features. 

### Available Buttons
A base button component that provides common functionality and styling for all button types. All buttons extends this base button. Here are the available button types in the library.
- Base Button
- Bootstrap Link Button
- Close Button
- Delete Button
- Edit Bootstrap Button
- Edit Button
- Edit SVG Icon Button
- Excel Button
- Manage Button
- PDF Button
- Primary Button
- Save Primey Button
- Search Button
- Success Button
- View Button
- View Primary Button

## Base Button API
Buttons that extend the base button component inherit its inputs and outputs.


#### API Reference

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

