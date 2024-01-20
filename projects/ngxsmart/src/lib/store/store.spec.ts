import { Store } from '@js-smart/ngxsmart';

describe('Store', () => {
	let service: Store<Employee>;

	beforeEach(() => {
		service = new Store();
	});

	it('should be created', () => {
		expect(service).toBeDefined();
	});

	it('should update data', () => {
		service.update(employee);
		const storeEmployee = service.data();
		expect(employee).toEqual(storeEmployee);
	});

	it('should update data', () => {
		service.update({
			...employee,
			firstName: 'Jack',
		});
		const storeEmployee = service.data();
		expect(storeEmployee?.firstName).toEqual('Jack');
	});
});

interface Employee {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	age: number;
}

const employee: Employee = {
	id: 1001,
	firstName: 'John',
	lastName: 'Doe',
	email: 'jdoe@example.com',
	phone: '123-456-7890',
	age: 23,
};
