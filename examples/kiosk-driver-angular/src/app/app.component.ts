import { Component, OnInit } from '@angular/core';
import { routeAnimations } from './shared/animations/route-animations';
import cuss from '@elevated-libs/ecuss';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  /**
   * Best to import your animations from a separate file, this way
   * you can set them up to export as nothing if you want to do a legacy build
   */
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  title = 'kiosk-driver-angular';

  ngOnInit() {
    console.log(cuss);

    // Create Applet
    cuss.init();

    // Start the SDK
    cuss.startSDK();
  }
}
