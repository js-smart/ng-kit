import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DatePipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { injectMutation, injectQuery } from '@js-smart/ng-kit';

interface Post {
	id: number;
	userId: number;
	title: string;
	body: string;
}

/**
 * Demo component for injectQuery and injectMutation.
 *
 * Demonstrates:
 * - Signal-based reactive queryKey (changing postId re-fetches automatically)
 * - Caching: switching back to a previously loaded post ID is instant
 * - injectMutation with mutate and mutateAsync
 *
 * @author Pavan Kumar Jadda
 * @since 22.0.0
 */
@Component({
	selector: 'ng-kit-query-demo',
	imports: [
		DatePipe,
		JsonPipe,
		FormsModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatDividerModule,
		MatFormFieldModule,
		MatInputModule,
		MatProgressBarModule,
	],
	templateUrl: './query-demo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryDemoComponent {
	private http = inject(HttpClient);

	readonly postIds = [1, 2, 3, 4, 5];
	postId = signal(1);
	newTitle = signal('My demo post');

	// staleTime of 30s means switching back to a previously loaded ID is instant — served from cache
	post = injectQuery<Post>(() => ({
		queryKey: ['post', this.postId()],
		queryFn: () =>
			firstValueFrom(this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${this.postId()}`)),
		staleTime: 30_000,
	}));

	createPost = injectMutation<Post, Error, Partial<Post>>(() => ({
		mutationFn: (data) =>
			firstValueFrom(this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', data)),
	}));

	submitPost(): void {
		this.createPost.mutate({ title: this.newTitle(), body: 'Created from ng-kit query demo', userId: 1 });
	}

	async submitPostAsync(): Promise<void> {
		await this.createPost.mutateAsync({ title: this.newTitle(), body: 'Created via mutateAsync', userId: 1 });
	}
}
