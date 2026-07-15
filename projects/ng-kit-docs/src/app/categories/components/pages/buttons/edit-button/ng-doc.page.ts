import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { EditButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const EditButtonPage: NgDocPage = {
	title: 'Edit Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 6,
	demos: { EditButtonOpenInStackblitzComponent },
};

export default EditButtonPage;
