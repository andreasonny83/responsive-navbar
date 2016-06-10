# responsive-navbar

> Responsive navigation bar in VanillaJS

[![npm](https://img.shields.io/npm/v/responsive-navbar.svg?maxAge=86400)]()
[![Bower](https://img.shields.io/bower/v/responsive-navbar.svg?maxAge=86400)]()

Live demo available [here](http://sonnywebdesign.com/responsive-nav/)

## Installation

Add `responsive-navbar.js` and `responsive-navbar.css` to your project.

```html
<link href="responsive-navbar.css" rel="stylesheet">
<script src='responsive-navbar.js'></script>
```

responsive-navbar is available via `Bower`

```shell
$ bower install --save responsive-navbar
```

or `npm`

```shell
$ npm install --save responsive-navbar
```

## Basic usage

Simply call `ResponsiveNav.init();` to create a new `responsive-navbar`
instance in your project.

```js
ResponsiveNav.init();
```

## Developing

This project uses Npm and Gulp.

Prepare your environment cloning this repository on your local machine,
then open a terminal pointing to your project root directory and install
all the dependencies with:

```shell
$ npm install
```

Now you can launch the demo page running:

```shell
$ grunt serve
```

For debugging directly on your smartphone, point Chrome to the
`External link: http://192.168.1.72:3000` on your device and open Chrome
Inspect device on your desktop machine to establish the communication.
More information about Crome remote debugging available [here](https://developers.google.com/chrome-developer-tools/docs/remote-debugging)

## Changelog

Changelog available [here](https://github.com/andreasonny83/responsive-navbar/blob/master/CHANGELOG.md)
