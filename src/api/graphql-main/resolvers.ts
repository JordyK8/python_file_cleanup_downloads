import FolderSvc from '../../svc/folder-svc/folder-svc'

  const Hello = (_: any, args: any) => {
    console.log('working');
    return 'it works'
  };

  const GetFolders = (_: any, args: any) => { 
    const folderSvc = new FolderSvc();
    return folderSvc.getFolders()
  };


export default {
  Query: {
    Hello,
    GetFolders,
  },
}