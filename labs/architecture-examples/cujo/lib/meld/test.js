var meld = require('./meld');

var o = {
	f: function() {
		console.log('o.f');
	}
}

meld.add(o, 'f', {
	around: function() {},
	after: function() { console.log('after'); }
});

o.f();