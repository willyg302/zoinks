project = 'SCUBA'

def build():
	strap.node('gulp', module=True)

def install():
	strap.npm('install')

def default():
	strap.node('http-server dist', module=True)
