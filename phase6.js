const {airQualityCallback, airQualityPromise} = require('./airQualityHelper.js ');
const fs = require('fs');
let url = 'https://api.openaq.org/v2/latest';
for(let i=0;i<10;i++) {
    console.log("Inside for loop");
}
for(let i=0;i<10;i++){
    process.nextTick(function() {
        console.log("inside the next tick");
    });
}
async function getData() {
    let data = await airQualityPromise(url);
    console.log(`Ha we are getting the data via async await ${data}`);
}
fs.readFile('./input.txt', function(data) {
for(let i = 0; i<10; i++) {
    process.nextTick(function() {
    console.log("Next tick inside the reading the input file callback");
    });
    console.log(`Data is being read ${data}`);
    setTimeout(function() {
    console.log("Set timeout inside the reading the input file callback");
    }, 10);
}
});
Promise.resolve().then(() => {
    console.log("promise is being executed and resolved");
});
airQualityPromise(url).then((data) => {
    console.log(`Promise for IO has resolved, data is ${data}`);
}).catch(err => {
    console.log("error");
})
airQualityCallback(url, function(err, data) {
    if (err) {
        console.log("error");
        return;
    }
    console.log(`Callback for IO has resolved, data is ${data}`);
})
setImmediate(() => {
    console.log("Immediate");
});
const timeoutScheduled = Date.now();
setTimeout(function() {
    const delay = Date.now() - timeoutScheduled;
    console.log(`Inside the set timeout, and i was executed in ${delay}`)
}, 0);
getData();
console.log("end");