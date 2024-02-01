var fs = require('fs');
// read the file sync, write to the file sync
// read file async, write file sync
// read file sync, write file async
// read file async, write file async

function readWriteSync() {
    console.log("Reading and writing the file synchronously");
    const data = fs.readFileSync('./AFM-source/input.txt', {encoding: 'utf8', flag: 'r'});
    console.log('Data has been read');
    fs.writeFileSync('./AFM-destination/output.txt', data, {encoding: 'utf8', flag: 'w'})
    console.log('Data has been written');
}

function readSyncWriteAsync() {
    console.log("Reading the file sync and writing the file asynchronously");
    const data = fs.readFileSync('./AFM-source/input.txt', {encoding: 'utf8', flag: 'r'});
    console.log('Data has been read');
    fs.writeFile('./AFM-destination/output.txt', data, {encoding: 'utf8', flag: 'w'}, function(err, data) {
        if(err) {
            console.log('Writing to the file async has failed');
        } else {
            console.log("Data has been written async");
        }
    })
    console.log("Reading sync and writing async has completed");
}

function readAsyncWriteSync() {
    console.log("Reading the file async and writing the file sync");
    fs.readFile('./AFM-source/input.txt', {encoding: 'utf8', flag: 'r'}, function(err, data) {
        if(err) {
            console.log("Reading the file has failed");
        } else {
            console.log("Reading the data has finished");
            fs.writeFileSync('./AFM-destination/output.txt', data, {encoding: 'utf8', flag: 'w'});
            console.log("Writing to the file has finished");
        }
    });
    console.log("Reading Async and writing sync has completed");
    for(let i=0;i<10;i++) {
        console.log("hello i am doing work");
    }
}

function readAsyncWriteAsync() {
    console.log("Reading the file async and writing the file async");
    fs.readFile('./AFM-source/input.txt', {encoding: 'utf8', flag: 'r'}, function(err, data) {
        if(err) {
            console.log("Reading the file has failed");
        } else {
            console.log("Reading the data has finished");
            fs.writeFile('./AFM-destination/output.txt', data, {encoding: 'utf8', flag: 'w'}, function(err, data) {
                if(err) {
                    console.log('Writing to the file async has failed');
                } else {
                    console.log("Data has been written async");
                }
            });
            console.log("Writing the data has finished");
        }
    });
    console.log("Reading Async and writing async has completed");
    for(let i=0;i<10;i++) {
        console.log("hello i am doing work");
    }
}

//readWriteSync();
//readSyncWriteAsync();
//readAsyncWriteSync();
readAsyncWriteAsync();