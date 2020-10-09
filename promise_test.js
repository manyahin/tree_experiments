// test dynamic promise all
let promises = [];
let all = Promise.all(promises).then(() => {
  console.log(promises)
  console.log('done all!')
});

for (let i = 0; i < 25; i++) {
  let p = new Promise((res, rej) => {
    setTimeout(res, Math.random() * 100)
  });

  promises.push(p);
}
