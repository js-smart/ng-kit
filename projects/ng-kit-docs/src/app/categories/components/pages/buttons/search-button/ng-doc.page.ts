import { NgDocPage } from '@ng-doc/core';
import ButtonsCategory from '../ng-doc.category';
import { SearchButtonOpenInStackblitzComponent } from './open-in-stackblitz.component';

const SearchButtonPage: NgDocPage = {
	title: 'Search Button',
	mdFile: './index.md',
	category: ButtonsCategory,
	order: 14,
	demos: { SearchButtonOpenInStackblitzComponent },
};

export default SearchButtonPage;
