# esbox

[![NPM version][npm-image]][npm-url] [![Linux Build Status][travis-image]][travis-url] [![Windows Build Status][appveyor-image]][appveyor-url] [![Dependency Status][depstat-image]][depstat-url]

#### ES2016 in a box

Zero-configuration tool for demoing and experimenting with ES2016 JavaScript.

![demo-gif]

It automatically compiles and reruns your script every time you save. Think  of it like JSBin for your local editor and terminal, with full access to Node APIs and modules.

## Install

```sh
> npm install -g esbox
```

## Usage

To run `script.js` in a box:

```ssh
> esbox script.js
```

Every time you save the file, esbox clears the terminal display will clear and runs your script again.

To see available flags, run `esbox --help`.

## Automatic Babel compilation

You can use almost proposed ECMAScript features that Babel supports ([stage-0](http://babeljs.io/docs/plugins/preset-stage-0/) and above), including async/await.

---

## License

[MIT](./LICENSE) © [Callum Locke](https://twitter.com/callumlocke)

[demo-gif]: demo.gif

[npm-url]: https://npmjs.org/package/esbox
[npm-image]: https://img.shields.io/npm/v/esbox.svg?style=flat-square

[travis-url]: https://travis-ci.org/callumlocke/esbox
[travis-image]: https://img.shields.io/travis/callumlocke/esbox.svg?style=flat-square&label=Linux

[appveyor-url]: https://ci.appveyor.com/project/callumlocke/esbox
[appveyor-image]: https://img.shields.io/appveyor/ci/callumlocke/esbox/master.svg?style=flat-square&label=Windows

[depstat-url]: https://david-dm.org/callumlocke/esbox
[depstat-image]: https://img.shields.io/david/callumlocke/esbox.svg?style=flat-square
