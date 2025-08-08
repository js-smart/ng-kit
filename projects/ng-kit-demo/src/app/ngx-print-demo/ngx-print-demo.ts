import { httpResource } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxPrintDirective } from '@js-smart/ng-kit';

interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
	website: string;
}

@Component({
	selector: 'ngx-print-demo',
	imports: [MatTableModule, MatPaginatorModule, MatSortModule, NgxPrintDirective, MatButtonModule],
	templateUrl: './ngx-print-demo.html',
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxPrintDemoComponent implements AfterViewInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	dataSource = new MatTableDataSource<User>();
	result = httpResource<User[]>(() => 'https://jsonplaceholder.typicode.com/users');

	constructor() {
		effect(() => {
			this.dataSource.data = this.result.value() ?? [];
		});
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
}
