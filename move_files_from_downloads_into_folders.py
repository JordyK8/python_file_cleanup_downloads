import os
from shutil import move
dir_to_clean = input('Folder')
user = os.getenv('USER')
dirs = {}
dirRange = ['Images','Documents','Others','Software']
root_dir = '/Users/{}/Downloads/'.format(user)
parent_dir = '/Users/{}/'.format(user)
doc_types = ('.doc', '.docx', '.txt', '.pdf', '.xls', '.ppt', '.xlsx', '.pptx')
image_types = ('.jpg', '.jpeg', '.png', '.svg', '.gif', '.tif', '.tiff')
software_types = ('.exe', '.pkg', '.dmg')

def check_dirs(dirs):
  for key in dirs:
    if not os.path.isdir("%s/" %dirs[key]):
      os.mkdir("%s/" %dirs[key])
      print("Dir %s/ created" %dirs[key])

def get_non_hidden_files_except_current_file(root_dir):
      return [f for f in os.listdir(root_dir) if
  os.path.isfile('{}{}'.format(root_dir, f)) and not f.startswith('.') and not
  f.__eq__(__file__)]

def move_files(files):
      for file in files:
        file_path = '{}{}'.format(root_dir, file)
        if file.endswith(doc_types):
          move(file_path, '{}/{}'.format(dirs.get('Documents'), file))
          print('file {} moved to {}'.format(file, dirs.get('Documents')))
        elif file.endswith(image_types):
          move(file_path, '{}/{}'.format(dirs.get('Images'), file))
          print('file {} moved to {}'.format(file, dirs.get('Images')))
        elif file.endswith(software_types):
          move(file_path, '{}/{}'.format(dirs.get('Software'), file))
          print('file {} moved to {}'.format(file, dirs.get('Software')))
        else:
          move(file_path, '{}/{}'.format(dirs.get('Others'), file))
          print('file {} moved to {}'.format(file, dirs.get('Others')))

for x in dirRange:
      dirs[x] = '{}{}'.format(parent_dir, x)

check_dirs(dirs)

if __name__ == "__main__":
  files = get_non_hidden_files_except_current_file(root_dir)
  move_files(files)
