# Elevated CUSS

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

![](https://github.com/elevationsoftware/ecuss/blob/master/images/angularcuss.png)


ECUSS is a library which brings modern development possibilities to the Common Use Self Service industry.  The CUSS specification has been around since the early 2000s and is very difficult to program against without a facade in place to facilitation communication.

CORBA (Common Object Request Broker Architecture) bridges the communication between the client application and the device layer. CORBA faded from use close to two decades ago as many new architectures emerged which proved much easier to use.

With ECUSS, organizations can use modern JavaScript frameworks and tools to build applications including TypeScript, Angular, React, Vue, EcmaScript+.  The framework is also forward compatible with alpha versions of the CUSS 2.X line and won't require any upgrades as the new version emerges.


#### Application written with ECUSS

![](https://github.com/elevationsoftware/ecuss/blob/master/images/new%20app.png)

### Installation

ECUSS requires an access token and binary dependencies to be used in production or to access real devices.  To facilitate development, the library can simulate all device commands and event subscriptions.

```sh
$ npm install @elevated-libs/cuss
```

# Using the Elevated CUSS Angular Service

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

// Instantiating the bagtag service in an Angular Component
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
* Required companyCode and applicationName to be defined in the environment file.
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

  // example:
  this.scannerService.barcode
  .subscribe(res => console.log('BARCODE', res.data[0].message));


```

## Environment Configuration

In addition to regular dependencies, the Elevated CUSS Angular Service requires several critical sets of data to configure the platform correctly.

Define a CUSS_CONFIG within your environment file.

Example:

```js
export const environment = {
  production: false,
  CUSS_CONFIG: {
    applicationName: 'elevated',
    companyCode: 'ELS',
    pectabTemplate: 'BTP030101...',
    images: []
  }
};
```

### Configuring Angular Service

There are several steps required to utilize the Elevated CUSS Angular Service:

* Add the module to the imports NgModule property and inject the environment file

```ts
//app.module.ts
import { CussModule } from '@elevated-libs/cuss';
import { environment } from '../environments/environment';

...

@NgModule({
...
imports: [
  CussModule.forRoot(environment)
]
```

### Enable Access to the Jar files

The Angular application must have access to the Jar files from the root of the web server. Which means that the following files should be accessible as follow:

```js
/elevated-cuss.jar
/jackson-annotations-2.6.0.jar
/jackson-databind-2.6.3.jar
/jackson-core-2.6.3.jar
```

Contact Elevation Software Tech support to get a production or trial copy of the necessary Jars.

## Dependencies

The Angular library has the following dependencies:

| Items          | Description                                                              |
| --------------- | -------------------------------------------------------------------------- |
| **ECUSS**      | A Javascript binding for Elevated CUSS Applet                            |
| **Java Applet**| The jar required to create a CORBA and JS binding                        |
| **KioskToken** | An Elevated unique identifier that enable cloud communication.           |
| **NPM Token**  | A required token that allows the installation of the private npm package |


## Special Features

### IntelliSense
![](https://github.com/elevationsoftware/ecuss/blob/master/images/intellisense1.png)
![](https://github.com/elevationsoftware/ecuss/blob/master/images/intellisense2.png)

### Cloud Connectivity
![](https://github.com/elevationsoftware/ecuss/blob/master/images/cloud.png)

Through the Elevated IOT Service, you can remotely control all kiosks in enterprise.  Control all kiosk devices through handheld applications and empower your agents and customers to use kiosks in new and creative ways.

Kiosk heath subscriptions can also give instant feed back on how all of your remote hardware is working.  Very little onsite administration is required once all of your kiosks are cloud connected.

![](https://github.com/elevationsoftware/ecuss/blob/master/images/dashboard.png)


## CUSS & Chrome Versions

| CUSS | Chrome | Adoption |
| --------------- | --------------- | --------------- | 
| **1.2** | No Chrome - IE 6 Only | End of Life ~ < 1% |
| **1.3** | Chrome 27 | ~ 45% |
| **1.4** | Chrome 39 | ~ 50% |
| **1.5** | Chrome 44 or BYOB** | No Adoption |

** Bring Your Own Browser (BYOB) was introduced in CUSS 1.5 but most CUSS Libraries still require a Java applet and hence restrict you to Chrome 44 and below.  **The Elevated ECUSS library uses a Java Fat Client proxy serving a REST API that lets you use any of the latest browsers.**


## Older Browsers - Graceful Degradation

### Regular VS Legacy Production/Development

Currently, the library supports two separate production builds. The first being a standard production build while the second is a legacy build for older browsers on older CUSS platforms.

The legacy production build can be used to deprecate functionality which can't be handled in browsers as old as Chrome 39 or 27.  JavaScript APIs are pretty stable after about Chrome 30.  But, intestive regression should be run and adequate polyfills may be needed to access simple methods such as Array.find.  Consider a solid Babel compilation workflow and usage of libraries like UnderScore or Lodash carefully.

See our [Chrome Compatibility Matrix](https://github.com/elevationsoftware) for a list of features and APIs available across versions.

#### Angular Example - Degrade Animation Libraries
As an example, browser animations were very unstable in older browsers and they really needed GPU acceleration to work as designed.  In an Angular workflow, move all your animations to an isolated location and then they can return noops based on environment configuration.

```sh
/shared/animations/my-custom-animation.ts
```

Within this animations file you can import the environment config:

```sh
import { environment } from '../../../environments/environment';
```

Using the environment config you can configure your animations to return the full animation for a regular build and no animation or potentially a limited animation for a legacy build:

```ts
const ANIMATION_STEPS_NONE: AnimationMetadata[] = [];
const ANIMATION_STEPS_ALL: AnimationMetadata[] = [
    // animations steps  
];
export const myCustomAnimations = trigger('customAnimation', [
  transition('* => *', environment.ANIMATIONS ? ANIMATION_STEPS_ALL : ANIMATION_STEPS_NONE)
]);
```

Then, just import your animation into the component.ts instead of writing it directly in the component declaration:

```ts
import { myCustomAnimations } from './shared/animations/my-customanimation.ts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [myCustomAnimations]
})
```

#### CSS support for legacy browsers

Consult documentation sites such as caniuse and MDN frequently to ensure decent CSS complaince.  Also remember that kiosks are typically I3 processors with very limited memory and should be treated as very incapable environments.

The Angular CLI build process comes bundled with autoprefixer support.  Ensure that the your build process is prefixing the CSS properly for the browser you are attempting to use. Also, verify that the browser is being covered by the rules in the browserslist file in the `src` folder.

##### Known Issues
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
