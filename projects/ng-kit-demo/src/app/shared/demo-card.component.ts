import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CodeBlock } from './code-block.component';

/**
 * Shared shell for every gallery example: an outlined Material card with a
 * title, description, an optional "props demonstrated" chip row, the projected
 * live demo, and an optional collapsible source-code block with copy.
 *
 * Ported from ng-autocomplete-demo's demo-card, adapted for the ng-kit gallery.
 */
@Component({
	selector: 'demo-card',
	imports: [MatCardModule, MatChipsModule, MatIconModule, MatButtonModule, CodeBlock],
	template: `
		<mat-card appearance="outlined" class="demo-card">
			<mat-card-header>
				<mat-card-title>{{ title() }}</mat-card-title>
				@if (description()) {
					<mat-card-subtitle>{{ description() }}</mat-card-subtitle>
				}
			</mat-card-header>

			<mat-card-content>
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

				@if (code()) {
					<div class="code-actions">
						<button mat-stroked-button color="primary" type="button" (click)="showCode.set(!showCode())" [attr.aria-expanded]="showCode()">
							<mat-icon>{{ showCode() ? 'expand_less' : 'code' }}</mat-icon>
							{{ showCode() ? 'Hide source' : 'View source' }}
						</button>
					</div>

					@if (showCode()) {
						<code-block [code]="code()" [language]="language()" />
					}
				}
			</mat-card-content>
		</mat-card>
	`,
	styles: `
		:host {
			display: block;
			margin-block-end: 1.5rem;
		}

		.demo-live {
			padding-block: 0.5rem;
		}

		.props-chip-set {
			margin-bottom: 1rem;
		}

		.code-actions {
			display: flex;
			align-items: center;
			gap: 0.25rem;
			margin-top: 1rem;
		}

		.code-block {
			margin: 0.5rem 0 0;
			padding: 1rem;
			overflow-x: auto;
			border-radius: 8px;
			background: rgba(0, 0, 0, 0.04);
			font-family: 'Roboto Mono', ui-monospace, monospace;
			font-size: 0.8125rem;
			line-height: 1.5;
		}
	`,
})
export class DemoCard {
	readonly title = input.required<string>();
	readonly description = input<string>('');
	readonly props = input<string[]>([]);
	readonly code = input<string>('');
	readonly language = input<'typescript' | 'html' | 'bash' | 'scss' | 'json'>('typescript');

	protected readonly showCode = signal(false);
}
