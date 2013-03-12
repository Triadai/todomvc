define({

	// Cujo uses OOCSS principles and thus separates theme (skin)
	// from structure CSS.
	theme: { module: 'css!theme/base.css' },

	// The root node where all the views will be inserted
	root: { $ref: 'dom!todoapp' },

	// Render and insert the create view
	createView: {
		render: {
			template: { module: 'text!app/create/template.html' },
			replace: { module: 'i18n!app/create/strings' }
		},
		insert: { first: 'root' }
	},

	// Hook up the form to auto-reset whenever a new todo is added
	createForm: {
		element: { $ref: 'dom.first!form', at: 'createView' },
		afterReturning: { 'todos.add': 'reset' }
	},

	// Render and insert the list of todos, linking it to the
	// data and mapping data fields to the DOM
	listView: {
		render: {
			template: { module: 'text!app/list/template.html' },
			replace: { module: 'i18n!app/list/strings' },
			css: { module: 'css!app/list/structure.css' }
		},
		insert: { after: 'createView' }
	},

	// Render and insert the "controls" view--this has the todo count,
	// filters, and clear completed button.
	controlsView: {
		render: {
			template: { module: 'text!app/controls/template.html' },
			replace: { module: 'i18n!app/controls/strings' },
			css: { module: 'css!app/controls/structure.css' }
		},
		insert: { after: 'listView' }
	},

	// Render and insert the footer.  This is mainly static text, but
	// is still fully internationalized.
	footerView: {
		render: {
			template: { module: 'text!app/footer/template.html' },
			replace: { module: 'i18n!app/footer/strings' }
		},
		insert: { after: 'root' }
	},

	// Create a Todos backbone collection
	todos: {
		create: 'app/Todos',
		properties: {
			model: { module: 'app/Todo' },
			// DI at work. The Todos collection should NOT be hardcoded
			// with a particular storage type.  We should be able to configure
			// them to be stored wherever we want.  DI allows us to create and
			// inject a LocalStorage adapter externally.
			localStorage: {
				create: {
					module: 'backbone/LocalStorage',
					args: 'todos-cujo-backbone'
				}
			}
		}
	},

	// The main controller, which is acting more like a mediator in this
	// application by reacting to events in multiple views.
	// Typically, cujo-based apps will have several (or many) smaller
	// view controllers. Since this is a relatively simple application,
	// a single controller fits well.
	todoController: {
		create: 'app/controller',
		properties: {
			_createTodoView: { $ref: 'createTodoView' },
			ready: { compose: 'todos.fetch' }
		},
		on: {
			createView: {
				'submit:form': 'form.getValues | cleanTodo | todos.create'
			}
		},
		afterFulfilling: {
			'todos.create': 'createTodo',
			'todos.reset': 'createTodos'
		},
		ready: 'ready'
	},

	createTodoView: {
		wire: {
			spec: 'app/todo/spec',
			defer: true,
			provide: {
				container: { $ref: 'dom.first!#todo-list', at: 'listView' }
			}
		}
	},

	form: { module: 'cola/dom/form' },
	cleanTodo: { module: 'app/create/cleanTodo' },
	generateMetadata: { module: 'app/create/generateMetadata' },

	toggleEditingState: {
		create: {
			module: 'wire/dom/transform/toggleClasses',
			args: {
				classes: 'editing'
			}
		}
	},

	setTodosTotalState: {
		create: {
			module: 'wire/dom/transform/cardinality',
			args: { node: { $ref: 'root' }, prefix: 'todos' }
		}
	},

	setTodosRemainingState: {
		create: {
			module: 'wire/dom/transform/cardinality',
			args: { node: { $ref: 'root' }, prefix: 'remaining' }
		}
	},

	setTodosCompletedState: {
		create: {
			module: 'wire/dom/transform/cardinality',
			args: { node: { $ref: 'root' }, prefix: 'completed' }
		}
	},

	plugins: [
		{ module: 'backbone/binder' },
		{ module: 'wire/debug' },
		{ module: 'wire/jquery/dom' },
		{ module: 'wire/dom/render' },
		{ module: 'wire/jquery/on' },
		{ module: 'wire/connect' },
		{ module: 'wire/aop' }
	]
});