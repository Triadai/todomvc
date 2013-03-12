<a href="http://promises-aplus.github.com/promises-spec"><img src="http://promises-aplus.github.com/promises-spec/assets/logo-small.png" alt="Promises/A+ logo" align="right" /></a>

[![Build Status](https://secure.travis-ci.org/cujojs/when.png)](http://travis-ci.org/cujojs/when) 

# when.js

When.js is cujojs's lightweight [Promises/A+](http://promises-aplus.github.com/promises-spec) and `when()` implementation, derived from the async core of [wire.js](https://github.com/cujojs/wire), cujojs's IOC Container.  It features:

* A rock solid, battle-tested Promise implementation
* Resolving, mapping, and reducing arrays of promises
* Executing tasks in parallel and sequence
* Transforming Node-style and other callback-based APIs into promise-based APIs

It passes the [Promises/A+ Test Suite](https://github.com/promises-aplus/promises-tests), is [very fast](https://github.com/cujojs/promise-perf-tests#test-results), and is **around 1.4k** when compiled with Google Closure + gzip, and has no external dependencies.

# What's New?

### 2.0.0

* Fully asynchronous resolutions.
* [Promises/A+](http://promises-aplus.github.com/promises-spec) compliance.
* New [`when/keys`](docs/api.md#object-keys) module with `all()` and `map()` for object keys/values.
* New [`promise.ensure`](docs/api.md#ensure) as a better, and safer, replacement for `promise.always`.  [See discussion](https://github.com/cujojs/when/issues/103).
* **DEPRECATED:** `promise.always`.  [See discussion](https://github.com/cujojs/when/issues/103) as to why it makes for easy mistakes.

[Full Changelog](CHANGES.md)

# Docs & Examples

[API docs](docs/api.md#api)

[More info on the wiki](https://github.com/cujojs/when/wiki)

[Examples](https://github.com/cujojs/when/wiki/Examples)

Quick Start
===========

### AMD

1. `git clone https://github.com/cujojs/when` or `git submodule add https://github.com/cujojs/when`
1. Configure your loader with a package:

	```js
	packages: [
		{ name: 'when', location: 'path/to/when/', main: 'when' },
		// ... other packages ...
	]
	```

1. `define(['when', ...], function(when, ...) { ... });` or `require(['when', ...], function(when, ...) { ... });`

### Script Tag

1. `git clone https://github.com/cujojs/when` or `git submodule add https://github.com/cujojs/when`
1. `<script src="path/to/when/when.js"></script>`
1. `when` will be available as `window.when`

### Node

1. `npm install when`
1. `var when = require('when');`

### RingoJS

1. `ringo-admin install cujojs/when`
1. `var when = require('when');`

# Running the Unit Tests

## Node

Note that when.js includes @domenic's [Promises/A Test Suite](https://github.com/domenic/promise-tests).  Running unit tests in Node will run both when.js's own test suite, and the Promises/A Test Suite.

1. `npm install`
1. `npm test`

## Browsers

1. `npm install`
1. `npm start` - starts buster server & prints a url
1. Point browsers at <buster server url>/capture, e.g. `localhost:1111/capture`
1. `npm run-script test-browser`

References
----------

Much of this code was inspired by @[unscriptable](https://github.com/unscriptable)'s [tiny promises](https://github.com/unscriptable/promises), the async innards of [wire.js](https://github.com/cujojs/wire), and some gists [here](https://gist.github.com/870729), [here](https://gist.github.com/892345), [here](https://gist.github.com/894356), and [here](https://gist.github.com/894360).

Some of the code has been influenced by the great work in [Q](https://github.com/kriskowal/q), [Dojo's Deferred](https://github.com/dojo/dojo), and [uber.js](https://github.com/phiggins42/uber.js).
