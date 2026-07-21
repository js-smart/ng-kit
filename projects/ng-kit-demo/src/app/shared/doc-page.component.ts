import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

/**
 * Shared documentation page shell, modelled on material.angular.dev: a title +
 * lead header followed by an Overview / API / Examples tab group. Pages project
 * their content into the [docLead], [docOverview], [docApi] and [docExamples]
 * slots. Projected content keeps the page component's own encapsulated styles.
 */
@Component({
	selector: 'doc-page',
	imports: [MatTabsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<header class="doc-header">
			<h1 class="doc-title">{{ title() }}</h1>
			<div class="doc-lead"><ng-content select="[docLead]" /></div>
		</header>

		<mat-tab-group class="doc-tabs" [mat-stretch-tabs]="false" animationDuration="0ms">
			<mat-tab label="Overview">
				<div class="doc-tab-body"><ng-content select="[docOverview]" /></div>
			</mat-tab>
			<mat-tab label="API">
				<div class="doc-tab-body"><ng-content select="[docApi]" /></div>
			</mat-tab>
			<mat-tab label="Examples">
				<div class="doc-tab-body"><ng-content select="[docExamples]" /></div>
			</mat-tab>
		</mat-tab-group>
	`,
	styles: `
		:host {
			display: block;
			width: 100%;
		}

		.doc-header {
			margin-block-end: 1rem;
		}

		.doc-title {
			margin-block-end: 0.5rem;
		}

		.doc-lead {
			color: rgba(0, 0, 0, 0.7);
		}

		.doc-tabs {
			width: 100%;
		}

		.doc-tab-body {
			padding-block-start: 1.5rem;
		}

		/* Material-docs-style tabs: uppercase labels. */
		.doc-tabs ::ng-deep .mdc-tab__text-label {
			text-transform: uppercase;
			letter-spacing: 0.05em;
			font-weight: 500;
		}
	`,
})
export class DocPage {
	readonly title = input.required<string>();
}
