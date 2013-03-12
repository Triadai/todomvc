define({

	view: {
		reactive: { module: 'text!app/todo/template.html' },
		insert: { last: 'container' },
		on: {
			'click:.destroy': 'todo.destroy',
			'change:.toggle': 'todo.toggleComplete'
		},
		bind: {
			to: { $ref: 'todo' },
			text: 'label, .edit',
			complete: [
				'.toggle',
				{ module: 'app/list/setCompletedClass' }
			]
		}
	},

	plugins: [
		{ module: 'backbone/binder' },
		{ module: 'wire/debug' },
		{ module: 'wire/jquery/dom' },
		{ module: 'wire/dom/reactive' },
		{ module: 'wire/jquery/on' }
	]
});