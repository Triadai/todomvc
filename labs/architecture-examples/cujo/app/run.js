(function( curl ) {

	var config = {
		paths: {
			curl: 'lib/curl/src/curl',
			jquery: 'lib/jquery-1.9.1',
			underscore: 'lib/underscore'
		},
		packages: [
			{ name: 'wire', location: 'lib/wire', main: 'wire' },
			{ name: 'when', location: 'lib/when', main: 'when' },
			{ name: 'meld', location: 'lib/meld', main: 'meld' },
			{ name: 'cola', location: 'lib/cola', main: 'cola' },
			{ name: 'poly', location: 'lib/poly', main: 'poly' },
			{ name: 'backbone', location: 'lib/backbone', main: 'backbone' }
		],
		preloads: ['poly/es5', 'jquery', 'underscore']
	};

	curl(config, ['wire!app/main']);

})( curl );