# Angular components and utilities
Reusable Angular components built with Angular Material and Bootstrap 5.x, Utility classes/functions for Date, Form and String operations

<p align="center">

[![CI](https://github.com/js-smart/ng-kit/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/js-smart/ng-kit/actions/workflows/build.yml)
<a href="https://www.npmjs.com/@js-smart/ng-kit">
<img src="https://img.shields.io/npm/v/@js-smart/ng-kit" alt="Ng Kit on npm" />
</a>
</p>

### Installation
Install the library
```shell
npm install @js-smart/ng-kit
```
and use it as shown below in each section


### Technologies
1. Angular 17+
2. Bootstrap 5+ (if applicable)

## Auto Complete
Reusable Auto Complete that extends Mat Auto Complete component
### Demo
https://js-smart-ng-kit.netlify.app/

### Usage

The library has one `autocomplete` component. To use the Auto Complete component, add the following code to the HTML page

**app.component.html**

```typescript
<!-- Auto Complete with Objects -->

<form [formGroup]="genericFormGroup">
    <autocomplete
      [data]="cities"
      [inputFormGroup]="genericFormGroup"
      [required]="true"
      [displayWith]="displayFn"
      bindLabel="location"
      bindValue="id"
      label="City"
      placeHolder="Select City">
    </autocomplete>
</form>

```

**app.component.ts**

Then define form group instances and object array (cities) and names (for string array)

```typescript
// Define objects  
cities = [{id: 1001, location: 'New York'}, {id: 1002, location: 'Boston'}, {id: 1001, location: 'Washington DC'}];

// Define Form Groups 
inputFormGroup = this.fb.group({
  autocomplete: ['']
})

//Display function
displayFn(object: any): string {
		if (typeof object === "string") return object;
		return object && object["location"] ? object["location"] : "";
	}
```

If you are using strings rather than objects, do not provide `bindLabel`, `bindValue` and `displayWith` inputs. See below sample
```
<!-- Auto Complete with Strings -->
<form [formGroup]="inputFormGroup">
  <autocomplete
    [data]="names"
    [inputFormGroup]="inputFormGroup"
    [required]="true"
    label="City"
    placeHolder="Select City">
  </autocomplete>
</form>
```


### Auto Complete API

#### List of selectors that can be used to select the component(s)

|  AutoComplete Selector      | 
| ----------- | 
| autocomplete, lib-autocomplete | 


#### Properties

| Property      | Description | Type | Default Value |
| ----------- | ----------- |----------- |----------- |
| inputFormGroup      |  Input Form Group     |FormGroup||
| label      | Label of the AutoComplete|string||
| placeHolder      |  PlaceHolder of the AutoComplete|string||
| appearance      |  Appearance of the AutoComplete, defaults to `fill`     |string|fill|
| classes      |  List of CSS classes that need to applied to autocomplete|string||
| bindLabel      |  Applies only to AutoComplete with Objects. Attribute of the Object whose value would be shown when searching for data |string|id|
| bindValue      |  Applies only to AutoComplete with Objects. Attribute of the Object whose value would be used for search. Defaults to `ID`     |string|id|
| displayWith      |  Applies only to AutoComplete with Objects. A function used to show display value in Input      |boolean|false|
| required      |  Provide `true` if AutoComplete is required, otherwise provide `false`    |boolean|false|
| data      |  List of Objects or String values that need to be bind and searched for     |any[] or string[]|false|


## Alert
Reusable alert component created with Bootstrap 5+ and Angular 17+
### Auto Complete API
#### List of selectors that can be used to select the component

| Selector      | 
| ----------- | 
| alert,lib-alert | 


#### Properties

| Property      | Description | Type | Default Value |
| ----------- | ----------- |----------- |----------- |
| dismissible      |  If set, displays an inline "Close" button      |boolean|false|
| dismissOnTimeout      | If set, dismisses the alert after Dismiss Timeout|boolean|true|
| dismissTimeout      |  Number in milliseconds, after which alert will be closed|string or number|5000|
| isOpen      |  Is alert visible      |boolean|false|
| type      |  Alert type. Provides one of four bootstrap supported contextual classes: success, info, warning and danger|string|info|

## Spinner
Reusable Spinner component created with Bootstrap 5.x and Angular 17.x

### Demo
https://main--js-smart-ng-kit.netlify.app/alert-demo
### API
#### List of selectors that can be used to select the component

| Selector      | 
| ----------- | 
| spinner,lib-spinner | 


#### Properties

| Property      | Description | Type | Default Value |
| ----------- | ----------- |----------- |----------- |
| bootstrapSpinner      |  Use Boostrap Spinner. Default `true` |boolean|false|
| diameter      |  Diameter of the Angular Material spinner|boolean|true|
| color      |  Color of the Angular Material spinner|string or `ThemePalette`|5000|
| strokeWidth      |   Stroke Width of the Angular Material spinner|boolean|false|

## Print
Angular (2++) directive that prints HTML section
### Usage
Import the main module `NgxPrintModule` :

   ```js
import {NgxPrintModule} from '@js-smart/print';

@NgModule({
  ...
    imports:
[NgxPrintModule, ...],
...
})

export class YourAppModule {
}
```

**3-** Then plug n' play with it:

- Assuming you want to print the following HTML section:

```html

<div>
  <!--Your html stuff that you want to print-->
</div>
<button>print</button> <!--Your relevant print button-->

```

- Now, what you have to do is tagging your *wanted-to-print* section by an `id` attribute, then link that `id` to a
  directive parameter in your button :

```html
 <!--
   1)- Add an ID here
 -->
<div id="print-section">
  <!--Your html stuff that you want to print-->
</div>

<!--
  2)- Add the directive name in your button (ngxPrint),
  3)- Affect your ID to printSectionId
-->
<button printSectionId="print-section" ngxPrint>print</button>

```

### Optional properties

- You want a customized title for your printing window ? you have the choice by adding a new attribute to your print
  button `printTitle`:

```html

<div id="print-section">

  <!-- ... -->

</div>

<button
  printTitle="MyTitle"
  printSectionId="print-section"
  ngxPrint>print
</button>

```

- Also, would you like to customize the printing window style sheet (CSS) ? Hence you can do so by adding infinite
  styles to another attribute called `printStyle`:

```html

<div id="print-section">

  <!-- ... -->

</div>

<button
  [printStyle]="{h1 : {'color': 'red'}, h2 : {'border': 'solid 1px'}}"
  printSectionId="print-section"
  ngxPrint>print
</button>

```

Here some simple styles were added to every `h1` & `h2` tags within the `div` where `print-section` is tagged to
its `id` attribute.

- If you would like to use your existing CSS with media print you can add the `useExistingCss` attribute:

```html

<div id="print-section">

  <!-- ... -->

</div>

<button
  [useExistingCss]="true"
  printSectionId="print-section"
  ngxPrint>print
</button>

```

- If you want to customize the printing window style sheet (CSS) by importing the css provided in assets/css
  use `styleSheetFile`:

```html

<div id="print-section">

  <!-- ... -->

</div>

<button
  styleSheetFile="assets/css/custom1.css,assets/css/custom2.css"
  printSectionId="print-section"
  ngxPrint>print
</button>

```
### Publish library to NPM
1. Build the library
    ```shell
    nx build ng-kit
    ```
2. If the NPM token is not configured, open `~/.npmrc` and add the following line:
    ```shell
    //registry.npmjs.org/:_authToken=<your npm token>
    ```
3. Then navigate to `dist` directory anf publish the library to NPM. If prompted, enter the 2fa auth code from the Authenticator app.
    ```shell
    cd dist/libs/ng-kit && npm publish --tag latest
    ```
   For beta releases use tag `--tag beta`
