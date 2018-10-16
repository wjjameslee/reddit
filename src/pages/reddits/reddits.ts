import { Component} from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { RedditService } from '../../app/services/reddit.service';
import { DetailsPage } from '../details/details';
import { SharedService } from '../../app/services/share.service';

@Component({
  selector: 'reddits',
  templateUrl: 'reddits.html'
})
export class RedditsPage {
  items: any;
  category: any;
  limit:any;
  choices: string[];

  constructor(public alertCtrl: AlertController, public sharedService: SharedService, public navCtrl: NavController, private redditService: RedditService) {
      this.choices = this.sharedService.getMyCategories();
      this.category = this.sharedService.getCategory();
      this.limit = this.sharedService.getLimit();
      this.getPosts(this.category, this.limit);

  }


  getPosts(category, limit) {
  	this.redditService.getPosts(category, limit).subscribe(response => {
  		this.items = response.data.children;
  	}, error => {
        console.log('Yikes, an error');
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Subreddit not found, deleting entry',
          buttons: ['OK']
         });

        alert.present();
        this.choices.splice(this.choices.length -1, 1);

    });
  }

  getFilteredPosts(category, limit, sort) {
    this.redditService.getFilteredPosts(category, limit, sort).subscribe(response => {
      this.items = response.data.children;
      }, error => {
          console.log('Yikes, an error');
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Subreddit not found, deleting entry',
            buttons: ['OK']
          });

          alert.present();
          this.choices.splice(this.choices.length -1, 1);
      });
  }

  viewItem(item) {
  	this.navCtrl.push(DetailsPage, {
  		item:item
  	});
  }

  changeCategory() {
    this.limit = this.sharedService.getLimit();
    this.sharedService.setCategory(this.category);
    var filt = this.sharedService.getSort();
  	if (filt == 'new' || filt == 'controversial') {
        this.getFilteredPosts(this.category, this.limit, filt);
    } else {
        this.getPosts(this.category, this.limit);
    }
  }

  checkThumbnail(url) {
    if (url.data.thumbnail == 'self') {
      return 'assets/images/thumbnail.jpg';
    }
    else {
      return url.data.thumbnail;
    }
  }


}
