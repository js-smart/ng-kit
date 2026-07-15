import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../../ng-doc.category';
import { SnackBarOpenInStackblitzComponent } from './open-in-stackblitz.component';

const SnackBar: NgDocPage = {
	title: 'Snack Bar',
	mdFile: './index.md',
	order: 5,
	category: ComponentsCategory,
	demos: { SnackBarOpenInStackblitzComponent },
};

export default SnackBar;
