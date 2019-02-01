# Elevated CUSS

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

![](https://github.com/elevationsoftware/ecuss/blob/master/imagess/angularcuss.png)


ECUSS is a CUSS-enabled, library that bridges the gap between old technologies such as CORBA and the new such as Angular, React, Vue, etc.

CORBA is a Common Object Request Broker Architecture that is being around for about 10-15 years. During its lifetime, CORBA has moved from being a bleeding-edge technology for early adopters, to being a popular middleware, to a niche technology that exists in relative obscurity. The complexity around building an application using CORBA has driven web developer away from it.


#### Application written with ECUSS

![](https://github.com/elevationsoftware/ecuss/blob/master/imagess/new%20app.png)

### Installation

ECUSS requires an access token and binary dependecies. For more information look at the dependencies table

```sh
$ npm install @elevated-libs/cuss
```

# Using Elvevated CUSS Angular Service

### Initiate SDK

```ts
import { CussService } from '@elevated-libs/cuss';


// start library inside Angular AppComponent

export class AppComponent {
  constructor ( private cussService: CussService ) {
    this.cussService.start();
  }
}

```

### Printing

```ts

import { BagTag } from '@elevated-libs/cuss';

....

// Instatiating the bagtag service in an Angular Component
export class BagTagComponent implements OnInit {
  constructor( private bagTag: BagTag ) {}
}

ngOnInit() {}

print(pectab: string): number {
  return this.bagTag.print(pectab);
}


```

### Scanning

```ts
import { ScannerService } from '@elevated-libs/cuss';

...

export class ScannerComponent implements OnInit, OnDestroy {
  
  barcodeData: string;
  scannerSubscrition: Subscription;
  constructor( private scannerService: ScannerService ) {}
  
  ngOnInit() {
    this.scannerSubscription = this.scannerService.barcode
    .subscribe(res => {
      this.barcodeData = res.data[0].message;
    });
  }

  ngOnDestroy() {
    this.scannerSubscription.unsubscribe();
  }
}

```

## API Reference

### CussService

```ts

import { CussService } from '@elevated-libs/cuss';

...
// Instantiating service in a Component or Service
constructor( private cuss: CussService) {}

/**
*  Events Observable
*  Subscribe to the events prop to get all cuss events
*/
events: Subject<cussEvent>;

  // example:
  this.cuss.events.Subscribe(event => {
    console.log(event.statusCode);
  });


/**
* Subscribe when the application becomes available
*/
activated: Subject<cussEvent>;

/**
* Subscribe when the application goes to the available state
*/
disabled: Subject<cussEvent>;

/**
* Initializes ecuss applet.
* Required companyCode and applicationName to be define in the environment file.
*/
init(): void

/**
* Starts the CORBA communication through the Applet.
*/
startSDK(): void 

/**
* Start the communication with CORBA.
* This function will call init and startSDK from the ecuss lib.
* Make sure to complete the CUSS_CONFIG data in the environment file.
*/
start(): void 

  //example
  this.cuss.start();

```

### BagTag

```ts
import { BagTag } from '@elevated-libs/cuss';

...
// Instantiating service in a Component or Service
constructor(private bagTag: BagTag) { }

/**
* Send the pectab template and images to the application manager, for later use when the app moves to the Active State.
* Example: BTT0301[A 520195=#01B1...
* @param pectab
*/
setup(pectab: string): number;


/**
* Send the pectab data to the application manager for a print process request
* Example: BTP030101#01
* @param pectab
*/
print(pectab: string): number;

```

### ScannerService

```ts
import { ScannerService } from '@elevated-libs/cuss';

...
// Instantiating service in a Component or Service
constructor(private scannerService: ScannerService) { }

/**
* Subscribe to barcode scanned text coming from a CUSS scanner
*/
barcode: Subject<scannerDataEvent>;

  // exmple:
  this.scannerService.barcode
  .subscribe(res => console.log('BARCODE', res.data[0].message));


```


## Technology Required

This Angular library has the following dependencies:

* **ECUSS** - A Javascript binding for Elevated CUSS Applet
* **Java Applet** - The jar required to create a CORBA and JS binding
* **KioskToken** - An Elevated unique identifier that enable cloud communication.
* **NPM Token** - A required token that allows the installation of the private npm package


### Regular VS Legacy Production/Developtment
Currently the app supports two separate production builds. The first being just a standard production build while the second is a legacy build for older borwsers on older CUSS platforms. 
Currently the legacy production build is being used to disable animations so as not to affect performance on older machines as well as extending the webpack build to resolve some issues running with an older feature set of javascript.
##### Setting up animations to support legacy builds
To properly support having your animation disabled for legacy builds they should be defined in a separate file in the animations folder. 
Like:
```sh
/shared/animatsion/my-custom-animation.ts
```
Then within this animations file you can import the environment config:
```sh
import { environment } from '../../../environments/environment';
```
Using the environemnt config you can configure your animations to return the full animation for a regular build and no animation or potentially a limited animation for a legacy build:

```ts
const ANIMATION_STEPS_NONE: AnimationMetadata[] = [];
const ANIMATION_STEPS_ALL: AnimationMetadata[] = [
    // animations steps  
];
export const myCustomAnimations = trigger('customAnimation', [
  transition('* => *', environment.ANIMATIONS ? ANIMATION_STEPS_ALL : ANIMATION_STEPS_NONE)
]);
```
Then we just import our animation into the component.ts instead of writing it directly in our component declaration:
```ts
import { myCustomAnimations } from './shared/animations/my-customanimation.ts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [myCustomAnimations]
})
```

##### CSS support for legacy browsers
The Angular CLI build process comes bundled with autoprefixer support. To ensure that the build process is prefixing the CSS properly for the browser you are attempting to run the app on. Ensure that the browser is being covered by the rules in the browserslist file in the `src` folder.

###### Known Issues
Using the css `flex` shorthand:
```css
flex: <flex-grow> <flex-shrink> <flex-basis>;
```
Does not get properly prefixed for chrome browsers and to ensure that regular and legacy builds both maintain the same styling it is best to split this rule out into the separate rules like:
```css
display: flex;
flex-grow: <value>;
flex-shrink: <value>;
flex-basis: <value>;
```

### Todos

 - Payment
 - Lights
 - GPP

