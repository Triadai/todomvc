(function( curl ) {

	var config = {
		baseUrl: 'app',
		paths: {
			theme: '../theme',
			curl: '../lib/curl/src/curl'
		},
		pluginPath: 'curl/plugin',
		packages: [
			{ name: 'wire', location: '../lib/wire', main: 'wire' },
			{ name: 'when', location: '../lib/when', main: 'when' },
			{ name: 'meld', location: '../lib/meld',  main: 'meld' },
			{ name: 'cola', location: '../lib/cola', main: 'cola' },
			{ name: 'poly', location: '../lib/poly', main: 'poly' }
		]
	};

	curl(config, ['poly/string', 'poly/array', 'poly/function']).next(['wire!main']);

})( curl );