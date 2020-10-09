const { AsyncNode } = require('./step_2');

// Test code for step 2
const a = new AsyncNode('a');
const b = new AsyncNode('b');
a.addChild(b);

const c = new AsyncNode('c');
const d = new AsyncNode('d');
const e = new AsyncNode('e');
c.addChild(d);
c.addChild(e);

d.whenReady(() => {
  console.log('d is ready');
});

const f = new AsyncNode('f');
c.addChild(f);
a.addChild(c);

c.whenReady(() => {
  console.log('c is ready');
});

a.whenReady(() => console.log('great success!'));