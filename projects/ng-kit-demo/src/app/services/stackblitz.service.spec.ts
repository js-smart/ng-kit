import sdk from '@stackblitz/sdk';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DemoConfig } from '../types/demo-config';
import { StackBlitzService } from './stackblitz.service';

vi.mock('@stackblitz/sdk', () => ({
	default: {
		openProject: vi.fn(),
	},
}));

describe('StackBlitzService', () => {
	const demoConfig: DemoConfig = {
		title: 'Test Demo',
		description: 'Test description',
		componentName: 'test-demo',
		componentTs: 'export class TestDemoComponent {}',
		componentHtml: '<p>Test</p>',
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('opens an Angular project using the WebContainer configuration', () => {
		new StackBlitzService().openDemo(demoConfig);

		expect(sdk.openProject).toHaveBeenCalledWith(
			expect.objectContaining({
				template: 'node',
				files: expect.objectContaining({
					'package.json': expect.any(String),
					'src/styles.scss': expect.stringContaining("@import 'bootstrap/dist/css/bootstrap.css'"),
					'src/assets/app-variables.scss': expect.stringContaining('--primary-color'),
					'src/assets/app-buttons.scss': expect.stringContaining('.primary-button'),
					'src/assets/app-mat-snack-bar.scss': expect.stringContaining('.success-snackbar'),
				}),
			}),
			{
				openFile: 'src/app/test-demo.component.ts',
				startScript: 'start',
			},
		);
	});

	it('generates a TypeScript 6 compatible module resolution setting', () => {
		new StackBlitzService().openDemo(demoConfig);

		const project = vi.mocked(sdk.openProject).mock.calls[0][0];
		const tsConfig = JSON.parse(project.files?.['tsconfig.json'] ?? '{}') as {
			compilerOptions?: { moduleResolution?: string };
		};

		expect(tsConfig.compilerOptions?.moduleResolution).toBe('bundler');
	});

	it('centers demos in a padded shell layout', () => {
		new StackBlitzService().openDemo(demoConfig);

		const project = vi.mocked(sdk.openProject).mock.calls[0][0];
		const styles = project.files?.['src/styles.scss'] ?? '';
		const appHtml = project.files?.['src/app/app.component.html'] ?? '';

		expect(styles).toContain('.demo-shell');
		expect(styles).toContain('align-items: center');
		expect(styles).toContain('max-width: 48rem');
		expect(appHtml).toContain('class="demo-shell"');
		expect(appHtml).toContain('<router-outlet></router-outlet>');
	});
});
