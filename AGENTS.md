# AGENTS.md

This file is the canonical instruction set for AI coding assistants in this repository.

## Angular rules (from `.cursor/rules.md`)

1. **Use Latest Angular and TypeScript**
   - Always use the latest stable Angular (currently v20+) and TypeScript.
   - Reference Angular 20+ APIs and features only.

2. **Modern Angular Features**
   - Prefer Angular control flow syntax (`@for`, `@if`, `@switch`) over legacy structural directives.
   - Use Angular signals for state management and reactivity.
   - Use input and output signals for component communication, not legacy decorators.

3. **No Legacy Decorators**
   - Do not use or recommend `@Input` and `@Output` decorators in new code.
   - Use signals and the latest Angular data flow/event patterns.

4. **Template Syntax & Style**
   - Use the latest template syntax and best practices.
   - Use `<ng-container>` for structural grouping when needed.

5. **Component Architecture**
   - Prefer standalone components; avoid NgModules for new features unless necessary.
   - Encapsulate features in self-contained, reusable components.

6. **Type Safety & Strictness**
   - Ensure `"strict": true` in all `tsconfig.json` files.
   - Always provide explicit types for functions, variables, and observables.

7. **Dependency Injection**
   - Use `@Injectable({providedIn: 'root'})` for services unless a different scope is required.
   - Prefer Angular DI patterns over manual instantiation or singletons.

8. **API Communication**
   - Use Angular's `HttpClient` for all HTTP/API interactions.
   - Prefer typed HTTP responses and RxJS-based error handling.

9. **State Management**
   - Use signals for component-level state.
   - For app-wide state, use signals-based or lightweight state libraries compatible with Angular 20+ (e.g., SignalStore, Akita signals). Avoid heavy/legacy state libraries like NgRx unless necessary.

10. **Testing**
    - Include unit test snippets for all code examples where applicable.
    - Use Angular's vitest and browser-playwright testing APIs.

11. **Accessibility**
    - Ensure all code follows WCAG guidelines and Angular accessibility best practices.

12. **Documentation and Comments**
    - Comment public APIs, inputs, and outputs.
    - Follow Angular style guide for structure and naming.

13. **No Deprecated APIs**
    - Do not use or recommend deprecated Angular APIs, patterns, or features.
    - Check for breaking changes or removals for each new Angular version.

# NG Kit — instructions for AI coding assistants

This file is the **single canonical repository context** for **Claude Code**, **Cursor**, **Codex**, **JetBrains AI Assistant**, **Copilot**, and any other agent. Do not treat parallel copies under `.cursor/`, `.claude/`, or `.aiassistant/` as separate sources of truth—those files only **point here** or add IDE wiring.

If instructions conflict, prefer **`AGENTS.md`** and the actual codebase.

---

## Quick constraints (do not skip)

- **Package manager**: **pnpm** only for installs and scripts (`pnpm install`, `pnpm run …`). Do not use npm or yarn unless the team has decided otherwise.
- **Angular**: **Standalone components** only; no `NgModule` feature modules.
- **Tests**: Unit tests — `pnpm run test` (Vitest). E2E — `pnpm run pw:run` / `pnpm run pw:run-dev` (Playwright). Prefer **`data-cy`** for e2e selectors.

---

## Angular coding rules (authoritative)

Apply these rules to all new or modified Angular code:

1. **Latest Angular + TypeScript**
   - Use the latest stable Angular and TypeScript versions supported by this repository.
   - Prefer Angular 20+ APIs and patterns.
2. **Modern Angular features**
   - Prefer Angular control flow syntax (`@for`, `@if`, `@switch`) over legacy structural directives where practical.
   - Use signals for component-level state and reactivity.
   - Use signal-based input/output patterns for component communication in new code.
3. **No legacy input/output decorators in new code**
   - Do not introduce new `@Input`/`@Output` usage when signal-based alternatives are available.
4. **Template syntax and style**
   - Use current Angular template best practices.
   - Use `<ng-container>` for structural grouping when no wrapper element is needed.
5. **Component architecture**
   - Prefer standalone components.
   - Keep features self-contained and reusable.
6. **Type safety and strictness**
   - Maintain `"strict": true` TypeScript configuration.
   - Use explicit types for functions, variables, and observables.
7. **Dependency injection**
   - Use `@Injectable({ providedIn: 'root' })` by default for services unless another scope is required.
   - Prefer Angular DI over manual singleton patterns.
8. **API communication**
   - Use Angular `HttpClient` for HTTP calls.
   - Use typed responses and RxJS-friendly error handling.
9. **State management**
   - Prefer signals for local/component state.
   - For app-wide state, prefer signal-based/lightweight approaches; avoid heavy legacy state libraries unless clearly justified.
10. **Testing**
    - Include or update unit tests for behavior changes when applicable.
    - Use the project's Vitest and Playwright setup.
11. **Accessibility**
    - Follow WCAG and Angular accessibility best practices for templates/components.
12. **Documentation and comments**
    - Document public APIs, inputs, and outputs.
    - Follow Angular style-guide naming and structure.
13. **No deprecated APIs**
    - Do not introduce deprecated Angular APIs or patterns.
    - Check migration/breaking-change guidance when adopting new Angular versions.

---

## Tech stack

### Core framework

- **Angular 21.x** with standalone components (no NgModules pattern)
- **TypeScript 5.9.3**
- **Bootstrap 5.3** + **Angular Material 21.x** (UI components)
- **RxJS 7.x**

### Package manager

**pnpm** (use `pnpm` for all install/script commands, not `npm` or `yarn`)

### Development tools

- **ESLint 9.x** with `angular-eslint` + `typescript-eslint` + `eslint-plugin-import` + `eslint-plugin-jsdoc`
- **Prettier 3.x** for code formatting
- **Playwright 1.58** for end-to-end tests
- **Vitest 4.x** for unit tests

---

## Project structure

```
ng-kit/
├── angular.json
├── package.json
├── projects/
│   ├── ng-kit/                              # Angular library (primary package)
│   │   ├── ng-package.json
│   │   └── src/
│   │       ├── public-api.ts
│   │       └── lib/
│   │           ├── components/
│   │           ├── directives/
│   │           ├── services/
│   │           ├── store/
│   │           ├── types/
│   │           └── util/
│   ├── ng-kit-demo/                         # Demo application for library usage
│   │   ├── public/
│   │   └── src/
│   │       ├── main.ts
│   │       └── app/
│   └── ng-kit-docs/                         # Documentation site (ng-doc)
│       ├── public/
│       └── src/
│           ├── main.ts
│           └── app/
│               ├── categories/
│               └── home/
└── dist/                                    # Build output
```

---

## Development commands

```bash
# Install dependencies
pnpm install

# Run demo app locally
pnpm run start
# App runs at http://localhost:4300

# Run docs app locally
pnpm run start:docs
# Docs run at http://localhost:4301

# Build library package
pnpm run build

# Build demo app
pnpm run build:demo

# Build docs app
pnpm run build:docs

# Watch builds in development mode
pnpm run watch

# Lint
pnpm run lint

# Unit tests (library)
pnpm run test

# Bundle analysis
pnpm run bundle:report

# E2E tests (Playwright against demo app URL)
pnpm run e2e
```

---

## Testing

### Playwright E2E

- **Test directory**: `ng-kit/projects/ng-kit-demo/e2e`
- **Test ID attribute**: `data-cy` (use `page.getByTestId('...')` which looks for `data-cy`)
- **Default viewport**: 1920×1080
- **Timeout**: 30s per test, 20s for `expect()`
- **Workers**: 4 locally, 3 on CI; fully parallel
- **Base URL**: `process.env.URL` or `https://localhost:4300`

Tests run in **Chromium only** (Firefox/WebKit are commented out in config). CI uses 2 retries on failure.

### Unit tests

Vitest is configured for unit testing. Run with `pnpm run test`.

---

## Code conventions

### Angular patterns

- Use **standalone** Angular components/directives (no new `NgModule`-based features).
- Prefer Angular signal APIs (`input`, `output`, signals) in components/directives.
- Prefer modern Angular template control flow (`@if`, `@for`, `@switch`).
- Keep library code under `projects/ng-kit/src/lib/` organized by feature area (components, directives, services, store, types, util).
- Export all public library APIs via `projects/ng-kit/src/public-api.ts`.
- Preserve existing public selectors and API contracts unless a breaking change is explicitly intended.

### Naming

- Folders/files: `kebab-case`
- Classes/types: `PascalCase`
- Components: `*.component.ts`
- Directives: `*.directive.ts`
- Services: `*.service.ts`
- Specs: `*.spec.ts` colocated with source files
- Shared types: `projects/ng-kit/src/lib/types/`
- Utilities: `projects/ng-kit/src/lib/util/`

### Testing

- Unit tests use Angular's test runner (`pnpm run test`) and live alongside source.
- Keep tests focused on public behavior of components/directives/services.
- For targeted store tests, use `pnpm run test:store`.
- E2E tests run with Playwright via `pnpm run e2e` against the demo app URL.

### Linting

ESLint is configured with `angular-eslint`, `typescript-eslint`, `eslint-plugin-import`, and `eslint-plugin-jsdoc`. Run `pnpm run lint` before commit. Use the repository Prettier config/editor integration for formatting.

### JS/TS Comments

Use concise JSDoc for public APIs and non-obvious logic. Include `@param` and `@return` where helpful; avoid redundant comments for self-explanatory code.

---

## IDE and editor setup (optional)

These tips are **not** a second source of truth for stack or workflow; they only help humans and assistants working inside an IDE.

### JetBrains (WebStorm, IntelliJ, etc.)

- In **Settings → Languages & Frameworks → Node.js**, prefer **pnpm** for installs/scripts when available, or use the built-in terminal with `pnpm` on your `PATH`.
- Enable the **Angular** plugin for standalone components, templates, and routes.
- Wire **ESLint** to the project config (**Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint**). Formatting: `pnpm run format:write` / `format:check`; align **format on save** with team norms.
- Create **npm** (pnpm) run configurations from `package.json` for `start`, `build`, `lint`, `test`, `pw:run`, etc., or run the same commands in the **Terminal** tool globalThis.
- **Local HTTPS**: dev server uses `https://localhost:4200`; HTTPS and local certs are required before the app loads in the browser.

### VS Code / Cursor

- Use the workspace’s ESLint and Prettier settings if present; run `pnpm run lint` / `pnpm run format:check` before commit.
- Optional env **`URL`** for Playwright base URL (see `playwright.config.ts`).

---

## Wrapper files (do not duplicate content)

| Location                                                                     | Purpose                                                                 |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [`.cursor/rules/ngkit.mdc`](./.cursor/rules/ngkit.mdc)                       | Cursor always-applied rule: short pointer + critical constraints        |
| [`.claude/CLAUDE.md`](./.claude/CLAUDE.md)                                   | Claude Code: pointer to this file                                       |
| [`.aiassistant/rules/instructions.md`](./.aiassistant/rules/instructions.md) | JetBrains AI Assistant rule file: pointer + `apply: always` frontmatter |
