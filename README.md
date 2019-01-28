# Elevated CUSS

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

ECUSS is a CUSS-enabled, library that bridges the gap between old technologies such as CORBA and the new such as Angular, React, Vue, etc.

CORBA is a Common Object Request Broker Architecture that is being around for about 10-15 years. During its lifetime, CORBA has moved from being a bleeding-edge technology for early adopters, to being a popular middleware, to a niche technology that exists in relative obscurity. The complexity around building an application using CORBA has driven web developer away from it.

#### Application without ECUSS

![](https://github.com/elevationsoftware/ecuss/blob/master/imagess/oldapp.png)

#### Application written with ECUSS

![](https://github.com/elevationsoftware/ecuss/blob/master/imagess/new%20app.png)

### Installation

ECUSS requires an access token and binary dependecies. For more information look at the dependencies table

```sh
$ npm install @elevated-libs/ecuss
```

# Using ECUSS SDK


```ts
import ecuss from '@elevated-libs/ecuss';


// Generating dom elements
ecuss.int();


// Start the communcation with the CUSS platform
ecuss.startSDK();

```

### Tech

Dillinger uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Ace Editor] - awesome web-based text editor
* [markdown-it] - Markdown parser done right. Fast and easy to extend.
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Gulp] - the streaming build system
* [Breakdance](http://breakdance.io) - HTML to Markdown converter
* [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.



### Plugins

Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| Github | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |


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
```sh
const ANIMATION_STEPS_NONE: AnimationMetadata[] = [];
const ANIMATION_STEPS_ALL: AnimationMetadata[] = [
    // animations steps  
];
export const myCustomAnimations = trigger('customAnimation', [
  transition('* => *', environment.ANIMATIONS ? ANIMATION_STEPS_ALL : ANIMATION_STEPS_NONE)
]);
```
Then we just import our animation into the component.ts instead of writing it directly in our component declaration:
```sh
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
```sh
flex: <flex-grow> <flex-shrink> <flex-basis>;
```
Does not get properly prefixed for chrome browsers and to ensure that regular and legacy builds both maintain the same styling it is best to split this rule out into the separate rules like:
```sh
display: flex;
flex-grow: <value>;
flex-shrink: <value>;
flex-basis: <value>;
```

### Development
To serve up the environement locally on port 5000 run:
```sh
$ npm run start
```
To serve up the legacy version locally on port 5000 run:
```sh
$ npm run start-old
```
### Building for source
For production release:
```sh
$ npm run build
```
For legacy production release:
```sh
$ npm run build-old
```
### Docker
Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd dillinger
docker build -t joemccann/dillinger:${package.json.version} .
```
This will create the dillinger image and pull in the necessary dependencies. Be sure to swap out `${package.json.version}` with the actual version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart="always" <youruser>/dillinger:${package.json.version}
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8000
```

#### Kubernetes + Google Cloud

See [KUBERNETES.md](https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md)


### Todos

 - Write MORE Tests
 - Add Night Mode

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
