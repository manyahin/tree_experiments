const { Node } = require('./step_1');

class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject
      this.resolve = resolve
    })
  }
}

// Step 2: AsyncNode class boilerplate
class AsyncNode extends Node {
  constructor(...args) {
    super(...args);

    // for debug
    [this.id] = args;

    this.ready = new Deferred();
  }
  onResourceReady() {
    console.log(`- resource ready! ${this.id}`)

    this.ready.resolve();
  }
  async whenReady(callback) {
    await Promise.all(
      [
        this.ready.promise,
        ...this.children.map(node => node.whenReady(null))
      ]
    );

    callback && callback();
  }
}

module.exports = { AsyncNode }