let p1 = new Promise((res, rej) => {
  setTimeout(res, 3000);
});

let p2 = new Promise((res, rej) => {
  setTimeout(res, 500);
});

let promises = [p1, p2];

Promise.all(promises).then((res) => {
  console.log('Solved all!');
});

promises.splice(0, 1);

console.log(promises);
