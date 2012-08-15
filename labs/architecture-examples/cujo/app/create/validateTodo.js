define(function() {

	/**
	 * Validates a todo.  A valid todo must have a non-empty text field
	 * @param todo {Object} todo object
	 * @return {Object} validation result that has a boolean valid field
	 * indicating whether the todo is valid or not, and an errors array that
	 * contains a list of validation errors if the todo is not valid.
	 */
	return function validateTodo(todo) {
		var valid, result;

		// Must be a valid object, and have a text property that is non-empty
		valid = todo && 'text' in todo && todo.text.trim();
		result = { valid: !!valid };

		if(!valid) result.errors = [{ property: 'text', message: 'missing' }];

		return result;
	}

});