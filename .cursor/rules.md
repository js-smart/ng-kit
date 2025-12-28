# Cursor Rules for Angular Projects

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
   - Use Angular’s `HttpClient` for all HTTP/API interactions.
   - Prefer typed HTTP responses and RxJS-based error handling.

9. **State Management**
   - Use signals for component-level state.
   - For app-wide state, use signals-based or lightweight state libraries compatible with Angular 20+ (e.g., SignalStore, Akita signals). Avoid heavy/legacy state libraries like NgRx unless necessary.

10. **Testing**
    - Include unit test snippets for all code examples where applicable.
    - Use Angular’s vitest and browser-playwright testing APIs.

11. **Accessibility**
    - Ensure all code follows WCAG guidelines and Angular accessibility best practices.

12. **Documentation and Comments**
    - Comment public APIs, inputs, and outputs.
    - Follow Angular style guide for structure and naming.

13. **No Deprecated APIs**
    - Do not use or recommend deprecated Angular APIs, patterns, or features.
    - Check for breaking changes or removals for each new Angular version.
