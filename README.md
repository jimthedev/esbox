# esbox

[![NPM version][npm-image]][npm-url] [![Linux Build Status][travis-image]][travis-url] [![Windows Build Status][appveyor-image]][appveyor-url] [![Dependency Status][depstat-image]][depstat-url]

#### ES2016 in a box

Tool for experimenting with ES2016 JavaScript, with zero setup and full access to Node.

![demo-gif]

- Automatically compiles with Babel
- Restarts whenever you save your script
- Clears the display on restart
- Readable stack traces

## Install

```sh
> npm install -g esbox
```

## Usage

To run `script.js` in a box:

```js
esbox script.js
```

Every time you save the file, the display will clear and your script will run again.

To see available flags, run `esbox --help`.

## Automatic compilation

esbox automatically compiles your script with Babel before running it. It uses the [stage-0 preset](http://babeljs.io/docs/plugins/preset-stage-0/) plus whatever plugins are needed to get your Node version up to speed with ES2015.

That means you can use any syntax Babel can handle, including async functions.

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
