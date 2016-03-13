# esbox

[![NPM version][npm-image]][npm-url] [![Linux Build Status][travis-image]][travis-url] [![Windows Build Status][appveyor-image]][appveyor-url] [![Dependency Status][depstat-image]][depstat-url]

#### ES2016 in a box

Tool for demoing and experimenting with ES2016 JavaScript in your editor and terminal. It has zero config and it automatically compiles and reruns your script when you save. Like a local JSBin but with access to Node APIs.

![demo-gif]

## Install

```sh
> npm install -g esbox
```

## Usage

To run `script.js` in a box:

```ssh
> esbox script.js
```

Every time you save the file, the display will clear and your script will run again.

To see available flags, run `esbox --help`.

## Automatic Babel compilation

esbox uses Babel's preset for [stage-0](http://babeljs.io/docs/plugins/preset-stage-0/) features, so you can use almost any proposed syntax on the ECMAScript roadmap, including `async/await`.

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
