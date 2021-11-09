import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import os
from MoveFiles import FileMover
import sys
import json


class Object:
    def __init__(self, **kwds):
        self.__dict__.update(kwds)

user = os.getenv('USER')
args_folder = json.load(sys.argv[1])
class Watcher:
    DIRECTORY_TO_WATCH = '/Users/{}/{}'.format(user, args_folder)
    ADD_DIR_RANGE = Object(name = 'Isos', extentions = ('.iso', '.isos'))

    def __init__(self):
        self.observer = Observer()
        self.fileMover = FileMover(self.DIRECTORY_TO_WATCH, self.ADD_DIR_RANGE)
    
    def run(self):
        event_handler = Handler(self.fileMover)
        self.observer.schedule(event_handler, self.DIRECTORY_TO_WATCH, recursive=True)
        self.observer.start()
        try:
            while True:
                time.sleep(5)
            
        except:
            self.observer.stop()
            print ("Error")
            
        self.observer.join()

class Handler(FileSystemEventHandler):

    def __init__(self, fileMover):
        self.fileMover = fileMover
    def on_any_event(self, event):
        if event.is_directory:
            return None
        elif event.event_type == 'created':
            print ("Received created event - %s.") %event.src_path
            self.fileMover.move_files(event.src_path, os.path.basename(event.src_path))

        elif event.event_type == 'modified':
            print ("Received modified event - %s.") %event.src_path

if __name__ == '__main__':
    # w = Watcher()
    # w.run()
    print('Reached python script')