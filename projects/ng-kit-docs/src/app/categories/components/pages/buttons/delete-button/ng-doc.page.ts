import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { DeleteButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const DeleteButtonPage: NgDocPage = {
	title: 'Delete Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 4,
	demos: { DeleteButtonOpenInStackblitzComponent },
};

export default DeleteButtonPage;
