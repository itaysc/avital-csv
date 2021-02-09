
const csvWorker = require('./csvworker');
const readline = require('readline');
const fs = require('fs');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function run(){
  let path = '';
  rl.question("Enter path to a folder containing the csv files: ", async function(answer) {
    path = answer;
    if(!fs.existsSync(path)){
      console.log("The path does not exist.");
    }
    await csvWorker(path);

    rl.close();
  });
  

   
};
  
run();