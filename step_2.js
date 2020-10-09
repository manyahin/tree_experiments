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
    this.resourceReady = new Deferred();

    this.callback = null;
    this.dependencies = new Set();

    this._addAsyncItem(this.resourceReady.promise);
  }
  onResourceReady() {
    console.log(`- ${this.id} - resource ready`)

    this.resourceReady.resolve();
  }
  addChild(child) {
    console.log(`- add child ${child.id} to ${this.id}`)

    this.children.add(child);

    this._addAsyncItem(child.ready.promise);
  }
  _ready() {
    console.log(`- ${this.id} - with children are ready`);

    this.ready.resolve();

    this.callback && this.callback();
  }
  _addAsyncItem(item) {
    this.dependencies.add(item);

    item.then(res => {
      if (this.dependencies.has(item)) {
        this.dependencies.delete(item);

        if (this.dependencies.size === 0) {
          this._ready();
        }
      }
    });
  }
  whenReady(callback) {
    if (callback) {
      this.callback = callback;
    }
  }
}

module.exports = { AsyncNode }