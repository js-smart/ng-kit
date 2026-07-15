import { ChangeDetectionStrategy, Component, output } from '@angular/core';

/**
 * Self-styled "Open in StackBlitz" button.
 *
 * Styling is fully encapsulated so it looks identical in the demo app (Bootstrap
 * loaded) and the docs site (no Bootstrap). Emits `open` when clicked.
 */
@Component({
	selector: 'ng-kit-open-in-stackblitz-button',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button type="button" class="sb-button" (click)="open.emit()">🚀 Open in StackBlitz</button>
	`,
	styles: [
		`
			:host {
				display: inline-block;
			}

			.sb-button {
				display: inline-flex;
				align-items: center;
				gap: 0.5rem;
				padding: 0.6rem 1.15rem;
				font-family: inherit;
				font-size: 0.95rem;
				font-weight: 600;
				line-height: 1.2;
				color: #fff;
				background: linear-gradient(135deg, #1389fd 0%, #0b6fd6 100%);
				border: none;
				border-radius: 8px;
				cursor: pointer;
				box-shadow: 0 2px 6px rgba(11, 111, 214, 0.35);
				transition:
					transform 0.15s ease,
					box-shadow 0.15s ease,
					filter 0.15s ease;
			}

			.sb-button:hover {
				filter: brightness(1.05);
				box-shadow: 0 4px 12px rgba(11, 111, 214, 0.45);
				transform: translateY(-1px);
			}

			.sb-button:active {
				transform: translateY(0);
				box-shadow: 0 2px 5px rgba(11, 111, 214, 0.4);
			}

			.sb-button:focus-visible {
				outline: 3px solid rgba(19, 137, 253, 0.4);
				outline-offset: 2px;
			}
		`,
	],
})
export class OpenInStackblitzButtonComponent {
	readonly open = output<void>();
}
