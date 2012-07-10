define(function() {

	return function(filters, defaultFilter) {
		if(!defaultFilter) defaultFilter = {};
		return function(route) {
			return filters.hasOwnProperty(route) ? filters[route] : defaultFilter;
		};
	};

});