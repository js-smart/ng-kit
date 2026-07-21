import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { ManageButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const ManageButtonPage: NgDocPage = {
	title: 'Manage Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 9,
	demos: { ManageButtonOpenInStackblitzComponent },
};

export default ManageButtonPage;
