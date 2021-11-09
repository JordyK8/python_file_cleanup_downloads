import FolderSvc from './svc/folder-svc/folder-svc'
import { Request, Response, NextFunction } from 'express';
export const getFolders = async (req: Request, res: Response, next: NextFunction) => {
  const folderSvc = new FolderSvc();
  const dataToSend = await folderSvc.getFolders()
  res.header("Access-Control-Allow-Origin", "*");
  res.send(dataToSend)
};

