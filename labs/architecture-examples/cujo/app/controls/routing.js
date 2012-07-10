(function(window) {
define(['when', 'wire/lib/functional'], function(when, functional) {

	return {
		wire$plugin: function(ready, destroyed, options) {
			var routes = [];

			ready.then(function() {
				window.addEventListener('hashchange', onHashChange, false);

				destroyed.then(function() {
					routes = [];
					window.removeEventListener('hashchange', onHashChange, false);
				});

				if(options.initial === false) return;

				onHashChange();
			});

			return {
				facets: {
					routes: {
						connect: routesFacet
					}
				}
			};

			function onHashChange(e) {
				var segment = window.location.hash.slice(1);
				routes.forEach(function(listener) {
					if(listener.route.test(segment)) {
						listener.handler(segment, e);
					}
				});
			}

			function addRoute(proxy, route, handler, wire) {
				return when(functional.compose.parse(proxy, handler, wire),
					function(handler) {
						routes.push({
							route: new RegExp(route),
							handler: handler
						});
					}
				);
			}

			function routesFacet(resolver, facet, wire) {
				var routes, route, promises;

				routes = facet.options;
				promises = [];

				for(route in routes) {
					promises.push(addRoute(facet, route, routes[route], wire));
				}

				when.all(promises, resolver.resolve, resolver.reject);
			}


		}
	}

});
})(window);
