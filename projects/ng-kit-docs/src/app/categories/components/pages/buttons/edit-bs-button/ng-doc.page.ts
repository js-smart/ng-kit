import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { EditBsButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const EditBsButtonPage: NgDocPage = {
	title: 'Edit Bootstrap Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 5,
	demos: { EditBsButtonOpenInStackblitzComponent },
};

export default EditBsButtonPage;
