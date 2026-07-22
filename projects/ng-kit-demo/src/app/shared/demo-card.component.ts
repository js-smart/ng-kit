import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { StackBlitzService } from '../services/stackblitz.service';
import { DemoConfig } from '../types/demo-config';
import { CodeBlock } from './code-block.component';

/**
 * Shared shell for every gallery example: a titled surface with a compact
 * top-right toolbar (link-to-example, view-source, open-in-StackBlitz), an
 * optional "props demonstrated" chip row, the projected live demo, and a
 * collapsible source block.
 *
 * Mirrors the autocomplete gallery's `ExampleViewer` so every component,
 * directive and utility demo shares the same material.angular.dev-style card
 * header. The live demo is projected via `<ng-content>`; the source shown by
 * the `code` toggle is the same runnable source that powers the StackBlitz
 * launch (pass it through {@link stackblitz} so the two never drift).
 */
@Component({
	selector: 'demo-card',
	imports: [MatChipsModule, MatIconModule, MatButtonModule, CodeBlock],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<section class="demo-card" [id]="resolvedAnchorId()">
			<header class="demo-card__header">
				<div class="demo-card__heading">
					<h4 class="demo-card__title">{{ title() }}</h4>
					@if (description()) {
						<p class="demo-card__desc">{{ description() }}</p>
					}
				</div>

				<div class="demo-card__actions">
					<button
						mat-icon-button
						type="button"
						class="demo-card__action"
						[title]="copied() ? 'Link copied' : 'Link to this example'"
						aria-label="Link to this example"
						(click)="copyLink()">
						<mat-icon>{{ copied() ? 'check' : 'link' }}</mat-icon>
					</button>
					@if (code()) {
						<button
							mat-icon-button
							type="button"
							class="demo-card__action"
							[title]="showCode() ? 'Hide source code' : 'View source code'"
							[attr.aria-pressed]="showCode()"
							aria-label="View source code"
							(click)="showCode.set(!showCode())">
							<mat-icon>code</mat-icon>
						</button>
					}
					@if (stackblitz()) {
						<button
							mat-icon-button
							type="button"
							class="demo-card__action"
							title="Open in StackBlitz"
							aria-label="Open in StackBlitz"
							(click)="openInStackBlitz()">
							<mat-icon>open_in_new</mat-icon>
						</button>
					}
				</div>
			</header>

			<div class="demo-card__body">
				@if (props().length) {
					<mat-chip-set aria-label="Props demonstrated" class="props-chip-set">
						@for (prop of props(); track prop) {
							<mat-chip>{{ prop }}</mat-chip>
						}
					</mat-chip-set>
				}

				<div class="demo-live">
					<ng-content />
				</div>
			</div>

			@if (showCode() && code()) {
				<div class="demo-card__source">
					<code-block [code]="code()" [language]="language()" />
				</div>
			}
		</section>
	`,
	styles: `
		:host {
			display: block;
			margin-block-end: 1.5rem;
		}

		.demo-card {
			border: 1px solid rgba(0, 0, 0, 0.12);
			border-radius: 8px;
			background: #fff;
			overflow: hidden;
		}

		.demo-card__header {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: 1rem;
			padding: 1rem 0.75rem 1rem 1.25rem;
			border-block-end: 1px solid rgba(0, 0, 0, 0.08);
		}

		.demo-card__heading {
			min-width: 0;
		}

		.demo-card__title {
			margin: 0;
			font-size: 0.9375rem;
			font-weight: 500;
		}

		.demo-card__desc {
			margin: 0.25rem 0 0;
			color: rgba(0, 0, 0, 0.6);
			font-size: 0.8125rem;
		}

		.demo-card__actions {
			display: flex;
			flex: 0 0 auto;
			align-items: center;
			gap: 0.125rem;
			color: rgba(0, 0, 0, 0.55);
		}

		.demo-card__body {
			padding: 1.5rem 1.25rem;
		}

		.demo-live {
			padding-block: 0.5rem;
		}

		.props-chip-set {
			margin-bottom: 1rem;
		}

		.demo-card__source {
			padding: 0 1.25rem 1rem;
		}
	`,
})
export class DemoCard {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly stackBlitzService = inject(StackBlitzService);

	readonly title = input.required<string>();
	readonly description = input<string>('');
	readonly props = input<string[]>([]);
	/** Runnable source shown by the "View source code" toggle. */
	readonly code = input<string>('');
	readonly language = input<'typescript' | 'html' | 'bash' | 'scss' | 'json'>('typescript');
	/**
	 * URL-fragment anchor for this example (kebab-case), e.g. `basic`. Falls back
	 * to a kebab-case slug derived from {@link title} when not provided.
	 */
	readonly anchorId = input<string>('');
	/** StackBlitz launch config; when set, the "Open in StackBlitz" action shows. */
	readonly stackblitz = input<DemoConfig | null>(null);

	protected readonly showCode = signal(false);
	protected readonly copied = signal(false);

	/** Effective anchor: the explicit {@link anchorId}, else a slug from the title. */
	protected readonly resolvedAnchorId = computed(() => this.anchorId() || slugify(this.title()));

	private readonly fragment = toSignal(this.route.fragment, { initialValue: null });

	constructor() {
		// Deep link: when the URL fragment targets this example, scroll it in.
		effect(() => {
			if (this.fragment() === this.resolvedAnchorId()) {
				this.host.nativeElement.scrollIntoView({ block: 'start' });
			}
		});
	}

	/** Point the URL fragment at this example, copy the link, and reveal it. */
	protected async copyLink(): Promise<void> {
		await this.router.navigate([], { relativeTo: this.route, fragment: this.resolvedAnchorId() });
		try {
			await navigator.clipboard.writeText(window.location.href);
			this.copied.set(true);
			setTimeout(() => this.copied.set(false), 1500);
		} catch {
			// Clipboard unavailable (e.g. insecure context) — the URL still updated.
		}
		this.host.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	/** Launch this example in StackBlitz using its {@link stackblitz} config. */
	protected openInStackBlitz(): void {
		const config = this.stackblitz();
		if (config) {
			this.stackBlitzService.openDemo(config);
		}
	}
}

/** Lower-cases and kebab-cases a title into a URL-fragment slug. */
function slugify(value: string): string {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}
