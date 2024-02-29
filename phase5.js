const {airQualityCallback, airQualityPromise} = require('./airQualityHelper.js ');
let url = 'https://api.openaq.org/v2/latest';
for(let i=0;i<10;i++) {
    console.log("Inside for loop");
}
for(let i=0;i<100;i++){
    process.nextTick(function() {
        console.log("inside the next tick");
    });
}
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
}, 10);
console.log("end");