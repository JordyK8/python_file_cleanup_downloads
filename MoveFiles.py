import os
from shutil import move
class FileMover():
    DIR_RANGE = [
      { name: 'Images', extentions: ('.jpg', '.jpeg', '.png', '.svg', '.gif', '.tif', '.tiff')},
      { name: 'Documents', extentions: ('.doc', '.docx', '.txt', '.pdf', '.xls', '.ppt', '.xlsx', '.pptx') }
      { name: 'Software', extentions: ('.exe', '.pkg', '.dmg') }
      { name: 'Others', extentions: ()}
    ]
    USER = os.getenv('USER')
    ROOT_DIR = '/Users/%s' %os.getenv('USER')
      
    def __init__(self, parent_dir, dir_range):
        if add_dir_range:
            self.add_dir_range(dir_range)
        self.check_dirs()

    def add_dir_range(dir_range):
        Ex = ValueError()
        Ex.strerror = "Got an invalid type for add_dir_range."
        try:
            if isinstance(dir_range, list):
                for dir in dir_range:
                    if isinstance(dir.name, str) and isinstance(dir.extentions, tuple):
                        self.DIR_RANGE.append(dir)
                    else:
                        raise Ex
            elif isinstance(dir_range.name, str) and isinstance(dir_range.extentions, tuple):
                self.DIR_RANGE.append(dir_range)
            else:
                raise Ex
        except ValueError as e:
            print("ValueError Exception!", e.strerror)

    def check_dirs():
      for dir in self.DIR_RANGE:
        if not os.path.isdir("{}/{}/".format(self.ROOT_DIR, dir)):
          os.mkdir("{}/{}/".format(self.ROOT_DIR, dir))
          print("Dir %s/ created" %dir)

    def get_non_hidden_file_except_current_file(file):
        return os.path.isfile('{}{}'.format(root_dir, file)) 
        and not file.startswith('.') 
        and not file.__eq__(__file__)

    def move_files(file_path, file):
        file_ext = os.path.splitext(filename)[1]
        for dir in self.DIR_RANGE:
            if file_ext in dir.extentions:
                move(file_path, '{}/{}/{}'.format(self.ROOT_DIR, dir.name, file))
                print('file {} moved to {}/{}'.format(file, self.ROOT_DIR, dir.name)