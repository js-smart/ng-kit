import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { EditSvgIconButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const EditSvgIconButtonPage: NgDocPage = {
	title: 'Edit SVG Icon Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 7,
	demos: { EditSvgIconButtonOpenInStackblitzComponent },
};

export default EditSvgIconButtonPage;
