import { EntityStore } from './entity-store';

interface Employee {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	age: number;
}

describe('EntityStore', () => {
	let service: EntityStore<Employee>;

	beforeEach(() => {
		service = new EntityStore();
	});

	it('should be created', () => {
		expect(service).toBeDefined();
	});

	it('should find an item by id', () => {
		service.setData(employees);
		const item = service.findById(1001);
		expect(item).toEqual({
			id: 1001,
			firstName: 'John',
			lastName: 'Doe',
			email: 'jdoe@example.com',
			phone: '123-456-7890',
			age: 23,
		});
	});

	it('should set data', () => {
		service.setData(employees);
		expect(service.data().length).toEqual(5);
	});

	it('should upsert an item', () => {
		service.setData(employees);
		const updatedEmployee = {
			id: 1001,
			firstName: 'Jack',
			lastName: 'Reacher',
			email: 'jreacher@example.com',
			phone: '123-456-7890',
			age: 29,
		};
		service.upsert(updatedEmployee);
		expect(service.findById(1001)).toEqual(updatedEmployee);
	});

	it('should upsert multiple items', () => {
		service.setData(employees);
		const updatedEmployee1 = {
			id: 1001,
			firstName: 'Jack',
			lastName: 'Reacher',
			email: 'jreacher@example.com',
			phone: '123-456-7890',
			age: 29,
		};
		const updatedEmployee2 = {
			id: 1002,
			firstName: 'Jack',
			lastName: 'Reacher',
			email: 'jreacher@example.com',
			phone: '123-456-7890',
			age: 29,
		};
		service.upsertMulti([updatedEmployee1, updatedEmployee2]);

		expect(service.findById(1001)).toEqual(updatedEmployee1);
		expect(service.findById(1002)).toEqual(updatedEmployee2);
	});

	it('should remove an item', () => {
		service.setData(employees);
		service.remove(1001);
		expect(service.findById(1001)).toBeUndefined();
		expect(service.data().length).toEqual(4);
	});
});

const employees = [
	{
		id: 1001,
		firstName: 'John',
		lastName: 'Doe',
		email: 'jdoe@example.com',
		phone: '123-456-7890',
		age: 23,
	},
	{
		id: 1002,
		firstName: 'Jack',
		lastName: 'Reacher',
		email: 'jreacher@example.com',
		phone: '123-456-7890',
		age: 34,
	},
	{
		id: 1003,
		firstName: 'Jack',
		lastName: 'Ryan',
		email: 'jryan@example.com',
		phone: '123-456-7890',
		age: 26,
	},
	{
		id: 1004,
		firstName: 'Steve',
		lastName: 'Rogers',
		email: 'srogers@example.com',
		phone: '123-456-7890',
		age: 29,
	},
	{
		id: 1005,
		firstName: 'John',
		lastName: 'Reese',
		email: 'jreese@example.com',
		phone: '123-456-7890',
		age: 28,
	},
];
