console.log("hello");

for(let i=0;i<10;i++) {
    console.log("Inside for loop");
}

process.nextTick(function() {
    console.log("inside the next tick");
})

console.log("end");