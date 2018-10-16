import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {
	category:any;
  limit:any;
  list:any;
  categorylist:string[];
	sort:any;

  constructor() {
    console.log("Sharing is caring.");
    this.limit = 10;
		this.sort = 'hot';
    this.categorylist = ['Sports', 'Food', 'WorldNews', 'Music', 'Funny', 'Gaming', 'Art'];
    this.category = this.categorylist[0].toLowerCase();
    console.log(this.category);
  }

  getMyCategories() {
    return this.categorylist;
  }

  setMyCategories(categories) {
    this.categorylist = categories;
  }

  addCategory(entry) {
    this.categorylist.push(entry);
  }

  removeCategory(index) {
    this.categorylist.splice(index, 1);
  }

  getCategory() {
    console.log('getCategory: ', this.category);
    return this.category;
  }

  getLimit() {
    console.log('getLimit: ', this.limit);
    return this.limit;
  }

  setCategory(category) {
    this.category = category;
    console.log('setCategory: added in ', this.category);
  }

  setLimit(limit) {
    this.limit = limit;
    console.log('setLimit: added in ', this.limit);

  }

  receive(data) {
    console.log("Received data...");
    this.list = data;
    console.log(this.list);
  }

  getData() {
    return this.list;
  }

	getSort() {
		return this.sort;
	}

	setSort(filter) {
		this.sort = filter;
	}


}
