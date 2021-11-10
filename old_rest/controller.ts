import FolderSvc from '../src/svc/folder-svc/folder-svc'
import { Request, Response, NextFunction } from 'express';

export const getFolders = async (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  try { 
    const folderSvc = new FolderSvc();
    const dataToSend = await folderSvc.getFolders()
    res.status(200).send(dataToSend)
  } catch (e) {
    res.status(500).send(e)
  }
};

