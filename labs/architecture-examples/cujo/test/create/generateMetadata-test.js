var buster, assert, refute, fail, generateMetadata;

buster = require('buster');
generateMetadata = require('../../app/create/generateMetadata');

assert = buster.assert;
refute = buster.refute;
fail = buster.assertions.fail;

buster.testCase('create/generateMetadata', {
	'should add id field': function() {
		var thing = generateMetadata({});

		assert.defined(thing.id);
	},

	'should add dateCreated field': function() {
		var thing = generateMetadata({});

		assert.isNumber(thing.dateCreated);
	},

	'should not affect fields other than id and dateCreated': function() {
		var expected, thing;

		expected = {};
		thing = generateMetadata({
			hasValue: expected
		});

		assert.same(thing.hasValue, expected);
	}
});