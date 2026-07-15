import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { PdfExportButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const PdfExportButtonPage: NgDocPage = {
	title: 'PDF Export Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 10,
	demos: { PdfExportButtonOpenInStackblitzComponent },
};

export default PdfExportButtonPage;
