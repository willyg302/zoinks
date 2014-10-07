project = 'Zoinks'

def cloc():
	'''Count LOC'''
	loc = 'find app/js/ {} -type f | xargs wc -l'
	print('Functionality LOC:')
	# @TODO
	print('Interface LOC:')
	strap.run(loc.format('! -name "*-test.js"'))
	print('Test LOC:')
	strap.run(loc.format('-name "*-test.js"'))

def build():
	strap.run(test).node('gulp', module=True)

def test():
	# Lint all JS and JSX files
	reporter = 'node_modules/jshint-stylish/stylish.js'
	strap.node('jsxhint --reporter {} --exclude **/__tests__/** app/js/.'.format(reporter), module=True)
	# Run Jest
	strap.npm('test')

def install():
	strap.npm('install')
	with strap.root('app'):
		strap.bower('install')

def default():
	strap.node('http-server dist', module=True)
