/**
 * binder
 * @author: brian
 */
(function(define) {
define(function(require) {

	var bindingHandler, when, backbone, WireProxy, bindMixin, modelProxy;

	bindingHandler = require('cola/dom/bindingHandler');
	when = require('when');
	backbone = require('backbone');
	WireProxy = require('wire/lib/WireProxy');
	bindMixin = { querySelector: { $ref: 'dom.first!' }, on: { $ref: 'on!' } };

	modelProxy = {
		get: function(name) {
			return this.target.get(name);
		},

		set: function(name, value) {
			return this.target.set(name, value);
		},

		observe: function(callback) {
			var model = this.target;

			// Sync data immediately
			callback(model.attributes);

			model.on('change', handleChange);

			return disconnect;

			function disconnect() {
				model.off('change', handleChange);
			}

			function handleChange(model) {
				callback(model.changed);
			}
		}

		// IMPORTANT: we don't want to override proxy.destroy to call model.destroy, since
		// that would actually DELETE the data.  Proxy.destroy is for destroying wire
		// components, which typically means tearing down the application/UI, and should
		// NOT imply that data deletion.
	};

	return {
		wire$plugin: plugin
	};

	function proxyModel(proxy) {
		if(!(proxy.target instanceof backbone.Model)) {
			return proxy;
		}

		return WireProxy.extend(proxy, modelProxy);
	}

	function plugin(ready, destroyed, options) {
		var unbind = [];

		destroyed.then(function() {
			unbind.forEach(function(unbind) {
				unbind();
			});
		});

		return {
			proxies: [proxyModel],
			facets: {
				bind: { connect: bindFacet }
			}
		};

		function bindFacet(resolver, proxy, wire) {
			if(!proxy.options.to) {
				throw new Error('bind options.to must be specified');
			}

			var promise = when.join(wire(proxy.options), wire(bindMixin))
				.spread(function(bindings, options) {

					return wire.getProxy(bindings.to).then(function(toProxy) {
						if(typeof toProxy.observe != 'function') {
							throw new Error('component does not support observe()');
						}
							
						delete bindings.to;
						options.bindings = bindings;

						toProxy.observe(bindingHandler(options, proxy.target));
					}
				);
			});

			resolver.resolve(promise);
		}

	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));
