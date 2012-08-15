define(function() {

	/**
	 * Normalizes fields of the supplied todo.  Specifically, it ensures
	 * that the todo has a text field that contains no leading or trailing
	 * whitespace, and a complete field that is strictly boolean.
	 * @param todo {Object} a todo object
	 * @return {Object} todo, which has been normalized
	 */
	return function(todo) {
		todo.text = todo.text && todo.text.trim() || '';
		todo.complete = !!todo.complete;

		return todo;
	}

});