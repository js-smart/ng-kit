import { Injectable } from '@angular/core';
import sdk from '@stackblitz/sdk';
import { DemoConfig } from '../types/demo-config';
import { getStackBlitzDependencies, getStackBlitzDevDependencies } from './stackblitz-dependencies';
import {
	STACKBLITZ_APP_BUTTONS_SCSS,
	STACKBLITZ_APP_MAT_SNACK_BAR_SCSS,
	STACKBLITZ_APP_VARIABLES_SCSS,
	STACKBLITZ_STYLES_SCSS,
} from './stackblitz-styles';

@Injectable({
	providedIn: 'root',
})
export class StackBlitzService {
	/**
	 * Opens a demo in StackBlitz
	 * @param demoConfig Configuration for the demo to open
	 */
	openDemo(demoConfig: DemoConfig): void {
		const files = this.generateStackBlitzFiles(demoConfig);

		// Use the WebContainers `node` template. Angular 22 needs a real `ng serve`
		// from package.json — the classic `angular-cli` template merges EngineBlock
		// deps and is a common cause of "Starting dev server" hangs.
		sdk.openProject(
			{
				title: demoConfig.title || 'Angular Demo',
				description: demoConfig.description || 'Angular demo powered by @js-smart/ng-kit',
				template: 'node',
				files: files,
			},
			{
				openFile: `src/app/${demoConfig.componentName}.component.ts`,
				startScript: 'start',
			},
		);
	}

	/**
	 * Generates the file structure for StackBlitz
	 */
	private generateStackBlitzFiles(demoConfig: DemoConfig): Record<string, string> {
		const files: Record<string, string> = {
			// Main entry point
			'src/main.ts': this.getMainTs(),
			'src/index.html': this.getIndexHtml(),
			// Mirror ng-kit-demo/src/styles.scss (+ assets) so demos look the same
			'src/styles.scss': STACKBLITZ_STYLES_SCSS,
			'src/assets/app-variables.scss': STACKBLITZ_APP_VARIABLES_SCSS,
			'src/assets/app-buttons.scss': STACKBLITZ_APP_BUTTONS_SCSS,
			'src/assets/app-mat-snack-bar.scss': STACKBLITZ_APP_MAT_SNACK_BAR_SCSS,

			// App component
			'src/app/app.component.ts': this.getAppComponentTs(demoConfig),
			'src/app/app.component.html': '<main class="demo-shell"><router-outlet></router-outlet></main>',
			'src/app/app.config.ts': this.getAppConfigTs(demoConfig),
			'src/app/app.routes.ts': this.getAppRoutesTs(demoConfig),

			// Demo component
			[`src/app/${demoConfig.componentName}.component.ts`]: demoConfig.componentTs,
			[`src/app/${demoConfig.componentName}.component.html`]: demoConfig.componentHtml || '',

			// TypeScript config
			'tsconfig.json': this.getTsConfig(),
			'tsconfig.app.json': this.getTsConfigApp(),

			// Package.json
			'package.json': this.getPackageJson(),

			// Pin WebContainers Node to Angular 22's required range
			'.nvmrc': '22.22.3',

			// Angular config
			'angular.json': this.getAngularJson(),
		};

		// Add component styles if provided
		if (demoConfig.componentScss) {
			files[`src/app/${demoConfig.componentName}.component.scss`] = demoConfig.componentScss;
		}

		// Add any additional files
		if (demoConfig.additionalFiles) {
			Object.assign(files, demoConfig.additionalFiles);
		}

		return files;
	}

	/**
	 * Gets the main.ts file content
	 */
	private getMainTs(): string {
		return `import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
	console.error('Unable to Bootstrap the application. Error:' + err),
);
`;
	}

	/**
	 * Gets the index.html file content
	 */
	private getIndexHtml(): string {
		return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Angular Demo</title>
		<base href="/" />
		<meta content="width=device-width, initial-scale=1" name="viewport" />
		<link href="https://fonts.gstatic.com" rel="preconnect" />
		<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
	</head>
	<body class="mat-typography">
		<app-root></app-root>
	</body>
</html>
`;
	}

	/**
	 * Gets the app.component.ts file content
	 */
	private getAppComponentTs(demoConfig: DemoConfig): string {
		return `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
`;
	}

	/**
	 * Gets the app.config.ts file content
	 */
	private getAppConfigTs(demoConfig: DemoConfig): string {
		const imports = demoConfig.requiredImports || [];
		const providers = demoConfig.additionalProviders || [];

		// Generate import statements only for demo-specific imports (base imports are hardcoded)
		const importStatements =
			imports.length > 0
				? imports
						.map((imp) => {
							const path = this.getImportPath(imp);
							return `import { ${imp} } from '${path}';`;
						})
						.join('\n')
				: '';

		// Build importProvidersFrom only for demo-specific imports
		const importProvidersStatement = imports.length > 0 ? `importProvidersFrom(\n\t\t\t${imports.join(',\n\t\t\t')}\n\t\t)` : '';

		const additionalProvidersStatement = providers.length > 0 ? providers.join(',\n\t\t') : '';

		const allProviders = [
			`provideRouter(
			routes,
			withComponentInputBinding(),
			withRouterConfig({
				onSameUrlNavigation: 'reload',
			}),
			withInMemoryScrolling(),
			withPreloading(PreloadAllModules),
			withRouterConfig({
				paramsInheritanceStrategy: 'always',
				onSameUrlNavigation: 'reload',
				defaultQueryParamsHandling: 'replace',
			}),
		)`,
			importProvidersStatement,
			additionalProvidersStatement,
		]
			.filter((p) => p && p.trim())
			.join(',\n\t\t');

		const importProvidersImport = imports.length > 0 ? ', importProvidersFrom' : '';

		return `import { ApplicationConfig${importProvidersImport} } from '@angular/core';
import {
	PreloadAllModules,
	provideRouter,
	withComponentInputBinding,
	withInMemoryScrolling,
	withPreloading,
	withRouterConfig,
} from '@angular/router';
import { routes } from './app.routes';
${importStatements ? `// Additional imports from demo config\n${importStatements}\n` : ''}

export const appConfig: ApplicationConfig = {
	providers: [
		${allProviders}
	],
};
`;
	}

	/**
	 * Gets the app.routes.ts file content
	 */
	private getAppRoutesTs(demoConfig: DemoConfig): string {
		const componentName = demoConfig.componentName;
		const ComponentClass = this.toPascalCase(componentName) + 'Component';

		return `import { Route } from '@angular/router';
import { ${ComponentClass} } from './${componentName}.component';

export const routes: Route[] = [
	{ path: '', component: ${ComponentClass}, pathMatch: 'full' },
];
`;
	}

	/**
	 * Gets the tsconfig.json file content
	 */
	private getTsConfig(): string {
		return JSON.stringify(
			{
				compileOnSave: false,
				compilerOptions: {
					outDir: './dist/out-tsc',
					forceConsistentCasingInFileNames: true,
					strict: true,
					noImplicitOverride: true,
					noPropertyAccessFromIndexSignature: true,
					noImplicitReturns: true,
					noFallthroughCasesInSwitch: true,
					esModuleInterop: true,
					sourceMap: true,
					declaration: false,
					experimentalDecorators: true,
					moduleResolution: 'bundler',
					importHelpers: true,
					target: 'ES2022',
					module: 'ES2022',
					lib: ['ES2022', 'DOM'],
					skipLibCheck: true,
					useDefineForClassFields: false,
				},
				angularCompilerOptions: {
					enableI18nLegacyMessageIdFormat: false,
					strictInjectionParameters: true,
					strictInputAccessModifiers: true,
					strictTemplates: true,
				},
			},
			null,
			2,
		);
	}

	/**
	 * Gets the tsconfig.app.json file content
	 */
	private getTsConfigApp(): string {
		return JSON.stringify(
			{
				extends: './tsconfig.json',
				compilerOptions: {
					outDir: './out-tsc/app',
					types: [],
				},
				files: ['src/main.ts'],
				include: ['src/**/*.d.ts'],
			},
			null,
			2,
		);
	}

	/**
	 * Gets the package.json file content
	 */
	private getPackageJson(): string {
		return JSON.stringify(
			{
				name: 'angular-demo',
				version: '0.0.0',
				scripts: {
					ng: 'ng',
					start: 'ng serve',
					build: 'ng build',
					watch: 'ng build --watch --configuration development',
					test: 'ng test',
				},
				private: true,
				dependencies: getStackBlitzDependencies(),
				devDependencies: getStackBlitzDevDependencies(),
			},
			null,
			2,
		);
	}

	/**
	 * Gets the angular.json file content
	 */
	private getAngularJson(): string {
		return JSON.stringify(
			{
				$schema: './node_modules/@angular/cli/lib/config/schema.json',
				version: 1,
				newProjectRoot: 'projects',
				projects: {
					'demo-app': {
						projectType: 'application',
						schematics: {
							'@schematics/angular:component': {
								style: 'scss',
							},
						},
						root: '',
						sourceRoot: 'src',
						prefix: 'app',
						architect: {
							build: {
								builder: '@angular/build:application',
								options: {
									outputPath: 'dist/demo-app',
									index: 'src/index.html',
									browser: 'src/main.ts',
									tsConfig: 'tsconfig.app.json',
									inlineStyleLanguage: 'scss',
									assets: [],
									styles: ['src/styles.scss'],
									scripts: [],
								},
								configurations: {
									production: {
										budgets: [
											{
												type: 'initial',
												maximumWarning: '500kb',
												maximumError: '1mb',
											},
										],
										outputHashing: 'all',
									},
									development: {
										optimization: false,
										extractLicenses: false,
										sourceMap: true,
									},
								},
								defaultConfiguration: 'production',
							},
							serve: {
								builder: '@angular/build:dev-server',
								options: {
									buildTarget: 'demo-app:build',
								},
								configurations: {
									production: {
										buildTarget: 'demo-app:build:production',
									},
									development: {
										buildTarget: 'demo-app:build:development',
									},
								},
								defaultConfiguration: 'development',
							},
						},
					},
				},
			},
			null,
			2,
		);
	}

	/**
	 * Gets the import path for a given import name
	 */
	private getImportPath(importName: string): string {
		const importMap: Record<string, string> = {
			CommonModule: '@angular/common',
			DatePipe: '@angular/common',
			FormsModule: '@angular/forms',
			ReactiveFormsModule: '@angular/forms',
			BrowserModule: '@angular/platform-browser',
			Title: '@angular/platform-browser',
			BrowserAnimationsModule: '@angular/platform-browser/animations',
			RouterModule: '@angular/router',
			PreloadAllModules: '@angular/router',
			provideRouter: '@angular/router',
			withComponentInputBinding: '@angular/router',
			withRouterConfig: '@angular/router',
			withInMemoryScrolling: '@angular/router',
			withPreloading: '@angular/router',
			MatSelectModule: '@angular/material/select',
			MatAutocompleteModule: '@angular/material/autocomplete',
			MatDatepickerModule: '@angular/material/datepicker',
			MatNativeDateModule: '@angular/material/core',
			MAT_DIALOG_DEFAULT_OPTIONS: '@angular/material/dialog',
		};

		return importMap[importName] || '@angular/core';
	}

	/**
	 * Converts a string to PascalCase
	 */
	private toPascalCase(str: string): string {
		return str
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join('');
	}
}
