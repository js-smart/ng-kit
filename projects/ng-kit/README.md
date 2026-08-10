# NG Kit

Standalone Angular components, directives, and utilities — signals-first and built on Angular Material.

[![CI](https://github.com/js-smart/ng-kit/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/js-smart/ng-kit/actions/workflows/build.yml)
[![npm](https://img.shields.io/npm/v/@js-smart/ng-kit)](https://www.npmjs.com/package/@js-smart/ng-kit)

## Installation

Requires **Angular 19+**. Library majors track Angular majors — see the [compatibility matrix](https://ng-kit.netlify.app/installation).

```shell
pnpm add @js-smart/ng-kit @angular/material @angular/cdk
# or: npm i @js-smart/ng-kit @angular/material @angular/cdk
```

## Documentation

Examples and API docs: **[https://ng-kit.netlify.app/](https://ng-kit.netlify.app/)**

### Components

| Name                                                                 | Description                                              |
| -------------------------------------------------------------------- | -------------------------------------------------------- |
| [Autocomplete](https://ng-kit.netlify.app/autocomplete/introduction) | Signal-based autocomplete / combobox on Angular Material |
| [Buttons](https://ng-kit.netlify.app/buttons/introduction)           | Themed action buttons on a shared base                   |
| [Alert](https://ng-kit.netlify.app/alert)                            | Dismissible contextual alert banners                     |
| [Confirm Dialog](https://ng-kit.netlify.app/confirm-dialog)          | Material confirm dialog with a simple service API        |
| [Snack Bar](https://ng-kit.netlify.app/snack-bar)                    | Success / error snackbars                                |
| [Spinner](https://ng-kit.netlify.app/spinner)                        | Loading spinner                                          |

### Directives

| Name                                                                          | Description                                       |
| ----------------------------------------------------------------------------- | ------------------------------------------------- |
| [Ngx Print](https://ng-kit.netlify.app/ngx-print)                             | Print a DOM section                               |
| [Prevent Multiple Clicks](https://ng-kit.netlify.app/prevent-multiple-clicks) | Debounce rapid repeated clicks                    |
| [Autocomplete Suffix](https://ng-kit.netlify.app/autocomplete-suffix)         | Clear + dropdown suffix for Material autocomplete |

### Utilities

| Name                                                      | Description                                        |
| --------------------------------------------------------- | -------------------------------------------------- |
| [Progress Util](https://ng-kit.netlify.app/progress-util) | Track async progress state                         |
| [TanStack Query](https://ng-kit.netlify.app/query)        | Angular adapter (`injectQuery` / `injectMutation`) |

## Demo

Live site: **[https://ng-kit.netlify.app/](https://ng-kit.netlify.app/)**

To run the demo app locally:

```shell
pnpm install
pnpm start
```

Then open [http://localhost:4300](http://localhost:4300).

## License

[MIT](LICENSE)
