import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Shared documentation page shell, modelled on material.angular.dev: a title +
 * lead header followed by an Overview / Examples tab group (the API reference
 * lives inside Overview). Pages project content into the [docLead],
 * [docOverview], [docApi] and [docExamples] slots; projected content keeps the
 * page component's own encapsulated styles.
 *
 * The active tab is synced to the URL fragment (e.g. `/autocomplete#examples`)
 * so tabs are linkable and survive reloads.
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

		<mat-tab-group
			class="doc-tabs"
			[mat-stretch-tabs]="false"
			animationDuration="0ms"
			[selectedIndex]="selectedIndex()"
			(selectedIndexChange)="selectTab($event)">
			<mat-tab label="Overview">
				<div class="doc-tab-body">
					<ng-content select="[docOverview]" />
					<h2 class="doc-api-heading">API</h2>
					<ng-content select="[docApi]" />
				</div>
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

		/* Separate the API reference from the overview prose. */
		.doc-api-heading {
			margin-block-start: 3.5rem;
			padding-block-start: 1.5rem;
			border-block-start: 2px solid rgba(0, 0, 0, 0.08);
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
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);

	readonly title = input.required<string>();

	/** Tab order; the label is also the URL fragment. */
	private readonly tabs: string[] = ['overview', 'examples'];
	private readonly fragment = toSignal(this.route.fragment, { initialValue: null });

	protected readonly selectedIndex = computed(() => {
		const index = this.tabs.indexOf(this.fragment() ?? 'overview');
		return index < 0 ? 0 : index;
	});

	protected selectTab(index: number): void {
		const fragment = this.tabs[index] ?? 'overview';
		if (fragment === (this.fragment() ?? 'overview')) {
			return;
		}
		void this.router.navigate([], { relativeTo: this.route, fragment });
	}
}
