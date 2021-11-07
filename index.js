const express = require('express')
const {spawn} = require('child_process');
const makeATree = require('./parseFolderData')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  let dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python3', ['SendInfo.py']);

  // collect data from script
  python.stdout.on('data', function (data) {
    const dataArr = data.toString().split('\n')
    if(dataArr[0] === '') dataArr.shift()

    const finalArray = [];
    dataArr.forEach((e) => {
      finalArray.push(e.split('/'));
    });

    const tree = makeATree(finalArray);
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

