import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('json', json);

/**
 * Syntax-highlighted code block, styled to match the ng-kit docs (dark surface,
 * language label, copy button) via highlight.js, while living inside the
 * Angular-Material-docs gallery theme.
 */
@Component({
	selector: 'code-block',
	imports: [MatIconModule, MatButtonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="code-block">
			<div class="code-block__bar">
				<span class="code-block__lang">{{ language() }}</span>
				<button mat-icon-button type="button" class="code-block__copy" (click)="copy()" [attr.aria-label]="copied() ? 'Copied' : 'Copy code'">
					<mat-icon>{{ copied() ? 'check' : 'content_copy' }}</mat-icon>
				</button>
			</div>
			<pre class="code-block__pre"><code class="hljs" [innerHTML]="highlighted()"></code></pre>
		</div>
	`,
	styles: `
		:host {
			display: block;
			margin-block: 0.5rem 1rem;
		}

		.code-block {
			border-radius: 8px;
			overflow: hidden;
			background: #0d1117;
			border: 1px solid rgba(255, 255, 255, 0.08);
		}

		.code-block__bar {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0.25rem 0.25rem 0.25rem 0.9rem;
			background: rgba(255, 255, 255, 0.04);
			border-block-end: 1px solid rgba(255, 255, 255, 0.08);
		}

		.code-block__lang {
			font-family: 'Roboto Mono', ui-monospace, monospace;
			font-size: 0.7rem;
			letter-spacing: 0.08em;
			text-transform: uppercase;
			color: rgba(255, 255, 255, 0.5);
		}

		.code-block__copy {
			color: rgba(255, 255, 255, 0.7);
			width: 32px;
			height: 32px;
			--mdc-icon-button-state-layer-size: 32px;
		}

		.code-block__copy mat-icon {
			font-size: 18px;
			width: 18px;
			height: 18px;
		}

		.code-block__pre {
			margin: 0;
			padding: 1rem 1.1rem;
			overflow-x: auto;
		}

		.code-block__pre code.hljs {
			background: transparent;
			padding: 0;
			font-family: 'Roboto Mono', ui-monospace, monospace;
			font-size: 0.8125rem;
			line-height: 1.6;
		}
	`,
})
export class CodeBlock {
	private readonly sanitizer = inject(DomSanitizer);

	readonly code = input.required<string>();
	readonly language = input<'typescript' | 'html' | 'bash' | 'scss' | 'json'>('typescript');

	protected readonly copied = signal(false);
	private copyResetHandle?: ReturnType<typeof setTimeout>;

	protected readonly highlighted = computed<SafeHtml>(() => {
		const lang = this.language();
		const value = hljs.getLanguage(lang) ? hljs.highlight(this.code(), { language: lang }).value : this.escape(this.code());
		return this.sanitizer.bypassSecurityTrustHtml(value);
	});

	private escape(text: string): string {
		return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	protected copy(): void {
		void navigator.clipboard.writeText(this.code()).then(() => {
			this.copied.set(true);
			if (this.copyResetHandle !== undefined) {
				clearTimeout(this.copyResetHandle);
			}
			this.copyResetHandle = setTimeout(() => this.copied.set(false), 2000);
		});
	}
}
