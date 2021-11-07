import os

class Object:
    def __init__(self, **kwds):
        self.__dict__.update(kwds)

user = os.getenv('USER')
directory = '/Users/%s' %user
folders = os.listdir(directory)
dirsToMatch = []
to_get_folders = ['Desktop', 'Documents', 'Movies', 'Music', 'Pictures']
send_dirs = []

def get_dirs(parent, dirs, obj):
    for dir in dirs:
        try:
            if os.path.isdir('{}/{}'.format(parent, dir)) and not dir.startswith('.'):
                object = Object(name = dir, children = [])
                if obj:
                    obj.children.append(object)
                else:
                    send_dirs.append(object)
                sub_dirs = os.listdir('{}/{}'.format(parent, dir))
                if sub_dirs:
                    get_dirs('{}/{}'.format(parent, dir), sub_dirs, object)
        except OSError as e:
            print('')

for f in folders:
    if f in to_get_folders:
        dirsToMatch.append(f)
get_dirs(directory, dirsToMatch, False)

def print_dirs(dirs, parent):
    for d in dirs:
        print('{}/{}'.format(parent, d.name))
        if d.children:
            print_dirs(d.children, '{}/{}'.format(parent, d.name))

print_dirs(send_dirs, '')
