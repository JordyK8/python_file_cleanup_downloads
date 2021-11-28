import FolderSvc from '../../svc/folder-svc/folder-svc'
import { PubSub, withFilter } from 'apollo-server-express';
const pubsub = new PubSub();
  const Hello = (_: any, args: any) => {
    console.log('working');
    pubsub.publish('TEST', { test: 'hoi' })
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
  Subscription: {
    Test: {
      subscribe: () => pubsub.asyncIterator(['TEST'])
  }
  }
}