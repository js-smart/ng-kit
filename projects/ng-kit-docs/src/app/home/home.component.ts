import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
	features = [
		{
			icon: '📦',
			title: 'Feature Rich',
			description: '20+ components, directives, and utilities for modern Angular development',
		},
		{
			icon: '🚀',
			title: 'Modern Angular',
			description: 'Built for Angular\'s latest features including signals, standalone components, and the new control flow',
		},
		{
			icon: '⚡',
			title: 'Performance',
			description: 'Optimized components that leverage Angular\'s change detection and signals system',
		},
		{
			icon: '🛠️',
			title: 'Developer Experience',
			description: 'Intuitive APIs that reduce boilerplate and improve code readability',
		},
		{
			icon: '🌳',
			title: 'Tree-shakable',
			description: 'Only import what you need, keeping your bundle size minimal',
		},
		{
			icon: '🔄',
			title: 'Type-safe',
			description: 'Full TypeScript support with excellent type inference',
		},
		{
			icon: '🎯',
			title: 'Focused',
			description: 'Each utility solves a specific problem without unnecessary complexity',
		},
		{
			icon: '📚',
			title: 'Well Documented',
			description: 'Comprehensive documentation with examples and interactive demos',
		},
	];
}

