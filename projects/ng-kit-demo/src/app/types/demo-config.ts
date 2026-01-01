/**
 * Configuration for opening a demo in StackBlitz
 */
export interface DemoConfig {
	/**
	 * Title of the demo
	 */
	title: string;

	/**
	 * Description of the demo
	 */
	description?: string;

	/**
	 * Name of the component (e.g., 'alert-demo')
	 */
	componentName: string;

	/**
	 * TypeScript code for the component
	 */
	componentTs: string;

	/**
	 * HTML template for the component
	 */
	componentHtml: string;

	/**
	 * SCSS styles for the component (optional)
	 */
	componentScss?: string;

	/**
	 * Required Angular imports (e.g., ['FormsModule', 'ReactiveFormsModule'])
	 */
	requiredImports?: string[];

	/**
	 * Additional provider configurations
	 */
	additionalProviders?: string[];

	/**
	 * Additional files to include in StackBlitz (key: file path, value: file content)
	 */
	additionalFiles?: Record<string, string>;
}

