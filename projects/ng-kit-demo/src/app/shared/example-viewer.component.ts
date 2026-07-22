import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, input, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeBlock } from './code-block.component';

/**
 * material.angular.dev-style example card: a titled surface with a compact
 * top-right toolbar (link-to-example, view-source, open-in-StackBlitz), the
 * projected live demo, and a collapsible source block.
 *
 * The live demo is projected via `<ng-content>`; the source shown by the
 * `code` toggle is the same runnable source that powers the StackBlitz launch.
 */
@Component({
	selector: 'example-viewer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [MatButtonModule, MatIconModule, CodeBlock],
	template: `
		<section class="example-viewer" [id]="anchorId()">
			<header class="example-viewer__header">
				<div class="example-viewer__heading">
					<h4 class="example-viewer__title">{{ title() }}</h4>
					@if (description()) {
						<p class="example-viewer__desc">{{ description() }}</p>
					}
				</div>

				<div class="example-viewer__actions">
					<button
						mat-icon-button
						type="button"
						class="example-viewer__action"
						[title]="copied() ? 'Link copied' : 'Link to this example'"
						aria-label="Link to this example"
						(click)="copyLink()">
						<mat-icon>{{ copied() ? 'check' : 'link' }}</mat-icon>
					</button>
					<button
						mat-icon-button
						type="button"
						class="example-viewer__action"
						[title]="showSource() ? 'Hide source code' : 'View source code'"
						[attr.aria-pressed]="showSource()"
						aria-label="View source code"
						(click)="showSource.set(!showSource())">
						<mat-icon>code</mat-icon>
					</button>
					<button
						mat-icon-button
						type="button"
						class="example-viewer__action"
						title="Open in StackBlitz"
						aria-label="Open in StackBlitz"
						(click)="openInStackBlitz.emit()">
						<mat-icon>open_in_new</mat-icon>
					</button>
				</div>
			</header>

			<div class="example-viewer__body">
				<ng-content />
			</div>

			@if (showSource()) {
				<div class="example-viewer__source">
					<code-block [code]="code()" language="typescript" />
				</div>
			}
		</section>
	`,
	styles: `
		:host {
			display: block;
			margin-block-end: 1.5rem;
		}

		.example-viewer {
			border: 1px solid var(--gallery-border);
			border-radius: 8px;
			background: var(--gallery-surface-raised);
			overflow: hidden;
		}

		.example-viewer__header {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: 1rem;
			padding: 1rem 0.75rem 1rem 1.25rem;
			border-block-end: 1px solid var(--gallery-border);
		}

		.example-viewer__heading {
			min-width: 0;
		}

		.example-viewer__title {
			margin: 0;
			font-size: 0.9375rem;
			font-weight: 500;
		}

		.example-viewer__desc {
			margin: 0.25rem 0 0;
			color: var(--gallery-text-muted);
			font-size: 0.8125rem;
		}

		.example-viewer__actions {
			display: flex;
			flex: 0 0 auto;
			align-items: center;
			gap: 0.125rem;
			color: var(--gallery-text-muted);
		}

		.example-viewer__body {
			padding: 1.5rem 1.25rem;
		}

		.example-viewer__source {
			padding: 0 1.25rem 1rem;
		}
	`,
})
export class ExampleViewer {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

	readonly title = input.required<string>();
	readonly description = input<string>('');
	/** URL-fragment anchor for this example (kebab-case), e.g. `combo-box`. */
	readonly anchorId = input.required<string>();
	/** Runnable source shown by the "View source code" toggle. */
	readonly code = input<string>('');

	readonly openInStackBlitz = output<void>();

	protected readonly showSource = signal(false);
	protected readonly copied = signal(false);

	private readonly fragment = toSignal(this.route.fragment, { initialValue: null });

	constructor() {
		// Deep link: when the URL fragment targets this example, scroll it in.
		effect(() => {
			if (this.fragment() === this.anchorId()) {
				this.host.nativeElement.scrollIntoView({ block: 'start' });
			}
		});
	}

	/** Point the URL fragment at this example, copy the link, and reveal it. */
	protected async copyLink(): Promise<void> {
		await this.router.navigate([], { relativeTo: this.route, fragment: this.anchorId() });
		try {
			await navigator.clipboard.writeText(window.location.href);
			this.copied.set(true);
			setTimeout(() => this.copied.set(false), 1500);
		} catch {
			// Clipboard unavailable (e.g. insecure context) — the URL still updated.
		}
		this.host.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}
