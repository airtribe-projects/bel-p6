console.log("hello");

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

setImmediate(() => {
    console.log("Immediate");
});

const timeoutScheduled = Date.now();

setTimeout(function() {
    const delay = Date.now() - timeoutScheduled;
   
    console.log(`Inside the set timeout, and i was executed in ${delay}`)
}, 0);

console.log("end");