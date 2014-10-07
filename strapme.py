project = 'Zoinks'

def build():
	strap.run(test).node('gulp', module=True)

def test():
	# Lint all JS and JSX files
	strap.node('jsxhint --reporter node_modules/jshint-stylish/stylish.js app/js/.', module=True)
	# Run Jest
	strap.npm('test')

def install():
	strap.npm('install')
	with strap.root('app'):
		strap.bower('install')

def default():
	strap.node('http-server dist', module=True)
