import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RedditService }  from './services/reddit.service';
import { TabsPage } from '../pages/tabs/tabs';
import { SharedService }  from './services/share.service';

@Component({
  templateUrl: 'app.html',
  providers: [RedditService, SharedService]
})
export class MyReddit {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
