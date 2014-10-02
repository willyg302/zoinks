project = 'Zoinks'

def build():
	strap.node('gulp', module=True)

def test():
	strap.node('gulp test', module=True)

def install():
	strap.npm('install')
	with strap.root('app'):
		strap.bower('install')

def default():
	strap.node('http-server dist', module=True)
