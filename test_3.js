const { RemovableAsyncNode } = require('./step_3');

// Test code for step 3
const a = new RemovableAsyncNode('a');
const b = new RemovableAsyncNode('b');
a.addChild(b);

const c = new RemovableAsyncNode('c');
const d = new RemovableAsyncNode('d');
const e = new RemovableAsyncNode('e');
c.addChild(d);
c.addChild(e);

const f = new RemovableAsyncNode('f');
c.addChild(f);
a.addChild(c);

a.whenReady(() => console.log('great success!'));
e.whenReady(() => {
  console.log('e is ready, removing c, moving f');
  a.removeChild(c);
  b.addChild(f);
});