import rootPackageJson from '../../../../../package.json';
import ngKitPackageJson from '../../../../../projects/ng-kit/package.json';

interface PackageJson {
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
	version?: string;
}

const rootPkg = rootPackageJson as PackageJson;
const ngKitPkg = ngKitPackageJson as PackageJson;

const RUNTIME_DEPENDENCY_KEYS = [
	'@angular/animations',
	'@angular/cdk',
	'@angular/common',
	'@angular/compiler',
	'@angular/core',
	'@angular/forms',
	'@angular/material',
	'@angular/platform-browser',
	'@angular/router',
	'bootstrap',
	'rxjs',
	'tslib',
] as const;

const WORKSPACE_DEV_DEPENDENCY_KEYS = ['zone.js'] as const;

const STACKBLITZ_DEV_DEPENDENCY_KEYS = [
	'@angular/build',
	'@angular/cli',
	'@angular/compiler-cli',
	'typescript',
] as const;

function pickVersions(source: Record<string, string | undefined>, keys: readonly string[]): Record<string, string> {
	const result: Record<string, string> = {};

	for (const key of keys) {
		const version = source[key];
		if (version) {
			result[key] = version;
		}
	}

	return result;
}

/** Builds StackBlitz runtime dependencies from the workspace package manifests. */
export function getStackBlitzDependencies(): Record<string, string> {
	return {
		...pickVersions(rootPkg.dependencies ?? {}, RUNTIME_DEPENDENCY_KEYS),
		'@js-smart/ng-kit': `^${ngKitPkg.version ?? '0.0.0'}`,
		...pickVersions(rootPkg.devDependencies ?? {}, WORKSPACE_DEV_DEPENDENCY_KEYS),
	};
}

/** Builds StackBlitz devDependencies from the workspace package manifest. */
export function getStackBlitzDevDependencies(): Record<string, string> {
	return pickVersions(rootPkg.devDependencies ?? {}, STACKBLITZ_DEV_DEPENDENCY_KEYS);
}
