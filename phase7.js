const fs = require('fs');

console.log("hello");

fs.readFile('/Users/ppanjwan/input.txt', {}, function (data) {
  setTimeout(() => {
    console.log("Inside the set timeout function");
    console.log(data);
  }, 0);

  setImmediate(() => {
    console.log("Inside the set immediate function");
  });
});

setImmediate(() => {
    console.log("set immediate outside");
});

setTimeout(function() {
  console.log('set timeout outside')
},0);


console.log("end");