const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 3000
app.get('/', (req, res) => {
  function makeATree(paths) {
    var tree = [];
    for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        var currentLevel = tree;
        for (var j = 0; j < path.length; j++) {
            var part = path[j];
  
            var existingPath = findWhere(currentLevel, 'label', part);
  
            if (existingPath) {
                currentLevel = existingPath.children;
            } else {
                var newPart = {
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
  
    function findWhere(array, key, value) {
        t = 0;
        while (t < array.length && array[t][key] !== value) { t++; };
  
        if (t < array.length) {
            return array[t]
        } else {
            return false;
        }
    }
  }
 
 let dataToSend;
 // spawn new child process to call the python script
 const python = spawn('python3', ['SendInfo.py']);
 // collect data from script
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  data = data.toString();
  const dataArr = data.split('\n')
  if(dataArr[0] === '') dataArr.shift()



  var filesList = dataArr;
  var finalArray = [];
    filesList.forEach((e) => {
          var arr = e.split('/');
          finalArray.push(arr);
    });
  const tree = makeATree(finalArray);
  console.log(tree[0].children);
    dataToSend = tree[0].children
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 res.header("Access-Control-Allow-Origin", "*");
 res.send(dataToSend)
 });
 
})
app.listen(port, () => console.log(`Example app listening on port 
${port}!`))