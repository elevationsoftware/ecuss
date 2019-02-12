# Elevated CUSS

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

![](https://github.com/elevationsoftware/ecuss/blob/master/images/angularcuss.png)


ECUSS is a library which brings modern development possibilities to the Common Use Self Service industry.  The CUSS specification has been around since the early 2000s and is very difficult to program against without a facade in place to facilitate communication.

The CUSS 1.X line is built entirely on CORBA (Common Object Request Broker Architecture) and modern technologies simply can't make use of such legacy tech without a complicated proxy.  CORBA bridges the communication gap between the client application and the device layer through a Java applet.  Applet technology itself (NPAPI) has also been obsolete for many years and it's graceful replacement is the intention of this library.

With ECUSS, organizations can use modern JavaScript frameworks and tools to build applications including TypeScript, Angular, React, Vue, EcmaScript+.  The framework is forward compatible with alpha versions of the CUSS 2.X line and won't require any upgrades as new versions emerges.


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
    
    // Register Your app in the CUSS Platform
    this.cussService.register()
    .then(res => {
      // check if all the required devices are available'
      if (res.allDevicesAvailable) {
        // Making the application AVAILABLE to the CLA
        this.cussService.start();
      }
    });
  }
}

```

### BagTag Printing

```ts

import { BagTag } from '@elevated-libs/cuss';

....

// Instantiating the bagtag service in an Angular Component
export class BagTagComponent implements OnInit {
  constructor( private bagTag: BagTag ) {}
}

ngOnInit() {}

async print(pectab: string): number {
  const responseCode = await this.bagTag.print(pectab);
  console.log(`Response Code: ${responseCode}`);
}


```

### Barcode Scanning

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
* Subscribe when the application goes from the active to the available state
*/
disabled: Subject<cussEvent>;

/**
* Register an application through the Elevated CUSS RESTful service. 
* companyCode and applicationName are required.
* POST http://{URL}/register - DATA {ClientConfiguration}
* @param config 
*/
register(config: ClientConfiguration):  Promise<RegisterResponse>;

/**
* Check the version of the Elevated CUSS RESTful service as well as
* a check function to verify service availability.
* GET http://{URL}/version
*/
version(): Promise<{ version: String}>

/**
* Get a list of available devices. 
* GET http://{URL}/devices
*/
devicesList(): Promise<Device[]>;

/**
* Enable a particular device by ID.
* POST http://{URL}/enable?deviceId={deviceId}
* @param deviceId 
*/
enable(deviceId: number): Promise<returncode>;

/**
* Disable a particular device by ID.
* POST http://{URL}/disable?deviceId={deviceId}
* @param deviceId
*/
disable(deviceId: number): Promise<returncode>;

/**
* Get the current resolution of the CUSS kiosk.
* GET http://{URL}/display
*/
getDisplay(): Promise<number[]>;

/**
* Set the screen resolution of the kiosk.
* POST http://{URL}/display?resolution={resolution}
* @param resolution 
*/
setDisplay(resolution: number): Promise<returncode>;

/**
* Get the fisical path of your application.
* GET http://{URL}/storage
*/
storage(): Promise<{response: String}>;

/**
* Setup any available device in the CUSS platform.
* POST http://{URL}/setup?deviceId={deviceId}&data={data}
* @param deviceId 
* @param data 
*/
setup(deviceId: number, data: string): Promise<returncode>;

/**
* Send data to a device in the CUSS platform.
* POST http://{URL}/send?deviceId={deviceId}&data=${data}
* @param deviceId 
* @param data 
*/
send(deviceId: number, data: String): Promise<returncode>;

/**
* Notify the CUSS platfrom that application wants to transition to a different state.
* POST http://{URL}/transition?state={state}
* @param state 
*/
transition(state: TRANS): Promise<returncode>;

/**
* Send a transition request from UNAVAILABLE to AVAILABLE
*/
start();

/**
  * Send a transition request from ACTIVE to AVAILABLE
  */
stop();

```

### BagTag

```ts
import { BagTag } from '@elevated-libs/cuss';

...
// Instantiating service in a Component or Service
constructor(private bagTag: BagTag) { }

/**
* Send the pectab template and images to the application manager, 
* for later use when the app moves to the Active State.
* The pectab is coming from the environment file
*/
setup(): Promise<returncode>;


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
* Subscribe to the barcode data comming from the CUSS Barcode Scanner.
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
    applicationName: 'elevatedcuss',
    companyCode: 'ELV',
    devices: [
      {
        name: 'passportReader',
        componentName: 'PassportReader',
        componentType: 'MediaInput',
        autoEnable: true
      },
      {
        name: 'bagtagPrinter',
        template: 'BTT0301[A ...',
        images: [],
        componentName: 'BagTagPrinter',
        componentType: 'MediaOutput',
        autoEnable: false,
        autoSetup: true
      },
      {
        name: 'boardingPassPrinter',
        // tslint:disable-next-line:max-line-length
        template: 'PT##?W0...',
        images: [],
        componentName: 'GPPrinter',
        componentType: 'MediaOutput',
        autoEnable: false,
        autoSetup: true
      },
      {
        name: 'Display',
        componentName: 'Display',
        componentType: 'Display',
      }
    ]
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

### Enable Elevated CUSS API

The Angular application must have access to the Elevated CUSS API, which is a webapi service that function as a bridge between CORBA and the web app through a Restful API. In order to access the elevated-cuss-api.jar please contact Elevation Software Sales Department.

#### Executing Elevated CUSS API Service
```sh
javaw -jar elevated-cuss-api.jar
```

Contact Elevation Software Tech support to get a production or trial copy of the necessary Jars.

## Dependencies

The Angular library has the following dependencies:

| Items          | Description                                                              |
| --------------- | -------------------------------------------------------------------------- |
| **ECUSS**      | A Javascript binding for Elevated CUSS Applet                            |
| **Java Jar**| The jar required to create a CORBA and JS bridge through a Restful API                        |
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

## USE CHROME - Internet Explorer is Dead

Microsoft never had the capability to keep up with Google in the browser market.  In fact, Microsoft's reboot of their browser has officially died late last year and is being re-imagined with the Chromium at it's core.  Let me restate that loudly:

`MICROSOFT IS BASING ITS FUTURE BROWSER OFFERING ON THE CHROMIUM PROJECT.`

There's a simple message to take away here folks:

**Just base all your kiosk applications on Chrome!**

The kiosk market share for CUSS 1.2, which only offered IE6, comprises of less than 1% of the market these days.  Chrome 27 is quite capable and Chrome beyond version 30 really has a decent API.  Develop your graceful degradation/progressive enhancement strategy and don't be afraid to build kiosk experiences that rival modern web apps!

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
