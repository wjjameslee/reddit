import { Component} from '@angular/core';
import { NavController, Nav, Tabs, AlertController} from 'ionic-angular';
import { RedditService } from '../../app/services/reddit.service';
import { DetailsPage } from '../details/details';
import { RedditsPage } from '../reddits/reddits';
import { SharedService } from '../../app/services/share.service';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  err: any;
  sort: any;
  options: string[];
  tab: Tabs;
  category: any;
  limit:any;

  constructor(public alertCtrl: AlertController, public sharedService: SharedService, public navCtrl: NavController, private nav: Nav, private redditService: RedditService) {
    this.tab = this.navCtrl.parent;
    this.options = this.sharedService.getMyCategories();
    this.getParams();
    this.err = 0;
    this.sort = this.sharedService.getSort();
  }

  getParams()  {
    this.category = this.options[0];
    this.limit = this.sharedService.getLimit();
  }


  setDefaults() {

    this.err = 0;
    if (!this.options.length) {
      let emptyErrorAlert = this.alertCtrl.create({
        title: 'Empty List Detected',
        subTitle: 'Please make sure to add at least one subreddit before submitting!',
        buttons: ['OK']
      });
      this.err = 1;
      emptyErrorAlert.present();
    }

    else {
      this.sharedService.setSort(this.sort);
      this.sharedService.setMyCategories(this.options);
      this.sharedService.setCategory(this.category);
      this.sharedService.setLimit(this.limit);

      if (this.sort == 'new' || this.sort == 'controversial') {

        this.redditService.getFilteredPosts(this.category, this.limit, this.sort).subscribe(response => {
        this.sharedService.receive(response.data.children);
        /** Send back data from Reddit API, update sharedService */
          }, error => {
            this.err = 1;

            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Subreddit is nonexistent!',
              buttons: ['Go Back']
            });

            alert.present();
            this.options.splice(this.options.length - 1, 1);

        });
        setTimeout(() => {
          console.log(this.err);
          this.displayMessage();
          if (this.err != 1) this.tab.select(0);
        }, 1500);
      }

      else {
        this.sharedService.setSort(this.sort);
        this.redditService.getPosts(this.category, this.limit).subscribe(response => {
        this.sharedService.receive(response.data.children);
        /** Send back data from Reddit API, update sharedService */
          }, error => {
            this.err = 1;

            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Subreddit is nonexistent!',
              buttons: ['Go Back']
            });

            alert.present();
            this.options.splice(this.options.length - 1, 1);

        });

        setTimeout(() => {
          console.log(this.err);
          this.displayMessage();
          if (this.err != 1) this.tab.select(0);
        }, 1500);
      }

  }
}

  displayMessage() {

    if (this.err != 1) {
      let alert = this.alertCtrl.create({
        title: 'Settings Updated',
        subTitle: 'Please re-select the desired category to fetch the posts',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  addCategory() {

    const alert = this.alertCtrl.create({
      title: 'New Category',
      message: 'Please type in the name of the subreddit below. No spaces!',
      inputs: [
        {
          name: 'newcategory'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            const navTransition = alert.dismiss();
            return false;
          }
        },
        {
          text: 'Add',
          role: 'add',
          handler: data => {
            console.log(data.newcategory);
            if (/\s/g.test(data.newcategory)) {
              console.log('Whitespace detected');

            }
            else {
              if (data.newcategory != '') {
                this.options.push(data.newcategory);
                this.err = 0;
                console.log('Add complete');
                const navTransition = alert.dismiss();
              }
              else {
                console.log('Empty category');
              }

              return false;
            }

          }
        }
      ]
    })
    alert.present();
  }


  removeCategory() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Remove Which?');

    let arr = this.options; for (let i=0; i < arr.length; ++i) {
      alert.addInput({
        type: 'radio',
        label: arr[i],
        value: arr[i],
        checked: false
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log('OK clicked');
        var toRemove = data;
        console.log(toRemove);
        var index = this.options.indexOf(toRemove, 0);
        if (index > -1) {
          this.options.splice(index, 1);
        }
        console.log(this.options);
      }
    });
    alert.present();
  }


}
