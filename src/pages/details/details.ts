import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({

  templateUrl: 'details.html'
})
export class DetailsPage {
	item:any;
  constructor(public navCtrl: NavController, public params:NavParams) {
  	this.item = params.get('item');
  }


  imageExist() {
  
    if (this.item.hasOwnProperty('preview')) {
      return this.item.preview.images[0].source.url;
    }
    else {
      return 'assets/images/pl.png';
    }
  }

}
