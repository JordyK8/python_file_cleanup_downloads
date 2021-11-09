import os
from shutil import move
class Object:
    def __init__(self, **kwds):
        self.__dict__.update(kwds)
class FileMover():
    DIR_RANGE = [
      Object(name = 'Images', extentions = ('.jpg', '.jpeg', '.png', '.svg', '.gif', '.tif', '.tiff')),
      Object(name = 'Documents', extentions = ('.doc', '.docx', '.txt', '.pdf', '.xls', '.ppt', '.xlsx', '.pptx')),
      Object(name = 'Software', extentions = ('.exe', '.pkg', '.dmg')),
      Object(name = 'Others', extentions = ())
    ]
    USER = os.getenv('USER')
    ROOT_DIR = '/Users/%s' %os.getenv('USER')
      
    def __init__(self, parent_dir, dir_range):
        if dir_range:
            if isinstance(dir_range, list):
                for dir in dir_range:
                    self.add_dir_range(dir.name, dir.extentions)
            else: self.add_dir_range(dir_range.name, dir_range.extentions)
        self.check_dirs()

    def add_dir_range(self, n, ext):
        Ex = ValueError()
        Ex.strerror = "Got an invalid type for add_dir_range."
        try:
            print(isinstance(n, str))
            print(n)
            print(isinstance(ext, tuple))
            print(ext)
            if isinstance(n, str) and isinstance(ext, tuple):
                self.DIR_RANGE.append(Object(name = n, extentions = ext))
            else:
                raise Ex
        except ValueError as e:
            print("ValueError Exception!", e.strerror)

    def check_dirs(self):
      for dir in self.DIR_RANGE:
        if not os.path.isdir("{}/{}/".format(self.ROOT_DIR, dir.name)):
          os.mkdir("{}/{}/".format(self.ROOT_DIR, dir.name))
          print("Dir %s/ created" %dir.name)

    def get_non_hidden_file_except_current_file(self, file, file_path):
        print('here1')
        print(file)
        print(os.path.isfile(file_path))
        print(os.path.isfile(file))
        return os.path.isfile(file_path) and not file.startswith('.') and not file.__eq__(__file__)

    def move_files(self, file_path, file):
        print('here')
        if self.get_non_hidden_file_except_current_file(file_path, file):
            print('here2')
            file_ext = os.path.splitext(filename)[1]
            for dir in self.DIR_RANGE:
                if file_ext in dir.extentions:
                    move(file_path, '{}/{}/{}'.format(self.ROOT_DIR, dir.name, file))
