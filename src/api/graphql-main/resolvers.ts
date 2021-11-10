import FolderSvc from '../../svc/folder-svc/folder-svc'
export default {
  Hello: () => {
    console.log('working');
    return 'it works'
  },

  GetFolders: () => { 
    const folderSvc = new FolderSvc();
    return folderSvc.getFolders()
  },

  
}