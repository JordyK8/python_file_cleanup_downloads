import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import os
from MoveFiles import FileMover

user = os.getenv('USER')

class Watcher:
    DIRECTORY_TO_WATCH = '/Users/%s/Downloads' %user
    ADD_DIR_RANGE = []
    def __init__(self):
        self.observer = Observer()
        self.file_mover = FileMover(self.DIRECTORY_TO_WATCH, self.ADD_DIR_RANGE)
    
    def run(self):
        event_handler = Handler()
        self.observer.schedule(event_handler, self.DIRECTORY_TO_WATCH, recursive=True)
        self.observer.start()
        try:
            while True:
                time.sleep(5)
            
        except:
            self.observer.stop()
            print "Error"
            
        self.observer.join()

class Handler(FileSystemEventHandler):

    @staticmethod
    def on_any_event(event):
        if event.is_directory:
            return None
        elif event.event_type == 'created':
            print "Received created event - %s." %event.src_path

        elif event.event_type == 'modified':
            print "Received modified event - %s." %event.src_path

if __name__ == '__main__':
    w = Watcher()
    w.run()