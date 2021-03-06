#angular-preload-image

A simple AngularJS module to make it easy to pre-load images to prevent the horrible waterfall effect: [Demo](http://revillweb.github.io/angular-preload-image/).

#Installation

##Install with bower

```
bower install angular-preload-image
```

##Include script files

```html
<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-preload-image/angular-preload-image.min.js"></script>
```

##Add module dependency

```javascript
angular.module('app', ['angular-preload-image']);
```

#Usage

##Pre-load background images

```html
<div preload-bg-image="[URL]" default-image="[URL]" fallback-image="[URL]"></div>
```

##Pre-load standard images

```html
<img preload-image ng-src="[URL]" default-image="[URL]" fallback-image="[URL]" />
```

#Develop

You should work only in 'develop' branch

##Publish task

Copy your output to the project you're testing on

```javascript
gulp publish --path *PATH*
```

##Release and tag your versions

gulp release

#Licence

MIT

#Credit

Inspiration taken from Ben Nadel's [post](http://www.bennadel.com/blog/2597-preloading-images-in-angularjs-with-promises.htm) about pre-loading images.

