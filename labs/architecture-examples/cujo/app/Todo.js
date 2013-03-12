/**
 * Todo
 * @author: brian
 */
(function(define) {
define(function(require) {

	var backbone;

	backbone = require('backbone');

	return backbone.Model.extend({
		toggleComplete: function() {
			return this.set('complete', !this.get('complete'));
		},

		parse: function( attrs ) {
			var ownAttrs, attr;

			// If a model is parsed into attrs just grab it's attrs
			// The backbone localstorage adapter parses a model as its response, weird huh?
			if ( attrs.attributes ) {
				attrs = attrs.attributes;
			}

			// Remove all properties that aren't directly from this object
			// Wire adds some funky functions onto the prototype
			ownAttrs = {};
			for ( attr in attrs ) {
				if ( attrs.hasOwnProperty( attr ) ) {
					ownAttrs[ attr ] = attrs[ attr ];
				}
			}

			return ownAttrs;
		},

		defaults: {
			text: '',
			complete: false
		}
	});

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
