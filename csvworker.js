const csv = require('node-csv');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const _path = require('path');
var stringify = require('csv-stringify');
// const parser = parse({columns: true}, function (err, records) {
// 	console.log(records);
// });

async function worker(path){
    const newPath = _path.resolve(path, 'modified');
    console.log("path for new files: ", newPath);
    if (!fs.existsSync(newPath)){
        fs.mkdirSync(newPath);
    }
    fs.readdir(path, function(err, filenames) {
        if (err) {
          console.log(err);
          return;
        }
        let avg = ['avg'];
        filenames.forEach(async function(filename) {
            if(filename.indexOf('.csv') > -1){
                try{
                    const fileContent = await fs.readFileSync(_path.resolve(path, filename));
                    const records = parse(fileContent, {columns: false});
                    const newRecords = [...records];
                    const colLen = records[0].length;
                    const rowsLen = records.length;
                    const avg = ['', 'avg'];
                    const sum = ['', 'sum'];
                    console.log("!!!!!! ", records[0][1])
                    for(let i = 2; i < colLen; i++){
                        let total = 0;
                        for(let j = 1; j < rowsLen; j++){
                            total += Number(records[j][i])
                        }
                        let colAvg = total/(rowsLen-1);
                        avg.push(colAvg)
                        sum.push(total);
                    }
                    newRecords.push(avg);
                    newRecords.push(sum);
                    newRecords[0].push('avg');
                    newRecords[0].push('sum');
                    for(let i = 1; i < rowsLen+2; i++){ // we aded 2 rows that also need to be calculated
                        let total = 0;
                        for(let j = 2; j < colLen; j++){
                            total += Number(newRecords[i][j]);
                        }
                        let rowAvg = total/(colLen-2);
                        newRecords[i].push(rowAvg);
                        newRecords[i].push(total);
                    }
                    stringify(newRecords, {
                        header: false
                    }, async function (err, output) {
                        await fs.writeFileSync(_path.resolve(newPath, filename), output);

                    })
                    console.log(records)
                }catch(err){
                    console.log(err);
                }
     
            }
        });
      });
}

module.exports = worker;