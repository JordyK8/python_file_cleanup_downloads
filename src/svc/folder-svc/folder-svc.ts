import { spawn } from 'child_process'
import { FSPart } from '../../@types/module' 
class FolderSvc {
  public dataToSend: FSPart[];

  constructor() {
    this.dataToSend = []
  }

  public getFolders() {
    return new Promise((resolve, reject) => {
      const python = spawn('python3', ['SendInfo.py'], {cwd: './src/lib/pythonScripts'});
      python.stdout.on('data', (data) => {
        console.log('data');
        
        const dataArr: string[] = data.toString().split('\n')
        if(dataArr[0] === '') dataArr.shift()
    
        const finalArray: string[][] = [];
        dataArr.forEach((e:string) => {
          finalArray.push(e.split('/'));
        });
  
        const tree = this.makeATree(finalArray);
        this.dataToSend = tree[0].children        
      });
    
      // in close event we are sure that stream from child process is closed
      python.on('close', (code: number) => {
        console.log(`child process close all stdio with code ${code}`);
        if (code !== 0) reject(new Error(`Unable to run python script. Exitcode: ${code}`))
        resolve(this.dataToSend);
      });

    })
  }
  public makeATree(paths: any): FSPart[] {
    const tree: FSPart[] = [];
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      let currentLevel = tree;
      for (let j = 0; j < path.length; j++) {
        const part = path[j];
    
        const existingPath = FolderSvc.findWhere(currentLevel, 'label', part);
    
        if (existingPath) {
          currentLevel = existingPath.children;
        } else {
          const newPart: FSPart = {
            id: paths[i].join('/'),
            label: part,
            children: [],
          }
    
          currentLevel.push(newPart);
          currentLevel = newPart.children;
        }
      }
    }
    return tree;
  }
    static findWhere(array: any, key: string, value: string) {        
        let t = 0;
        while (t < array.length && array[t][key] !== value) { t++; }
    
        if (t < array.length) {
            return array[t]
        } else {
            return false;
        }
    }
}


export default FolderSvc


