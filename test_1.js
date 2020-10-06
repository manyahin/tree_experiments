const { Node } = require('./step_1.js');

// Test code for step 1
const a = new Node();
const b = new Node();
a.addChild(b);

const c = new Node();
const d = new Node();
const e = new Node();
c.addChild(d);
c.addChild(e);

const f = new Node();
c.addChild(f);
a.addChild(c);

console.assert(!a.isReady());
setTimeout(() => console.assert(a.isReady()), 1000);