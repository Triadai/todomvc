var buster, assert, refute, fail;

buster = require('buster');

assert = buster.assert;
refute = buster.refute;
fail = buster.assertions.fail;

buster.testCase('create/generateMetadata', {
	'should add id field': function() {
		assert(false);
	},

	'should add dateCreated field': function() {
		assert(false);
	},

	'should not affect fields other than id and dateCreated': function() {
		assert(false);
	}
});