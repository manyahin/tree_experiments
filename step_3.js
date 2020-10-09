const { AsyncNode } = require('./step_2');

// Step 3: RemovableAsyncNode class boilerplate
class RemovableAsyncNode extends AsyncNode {
  constructor(...args) {
    super(...args);
  }
  removeChild(child) {
    this.children.delete(child);

    if (this.dependencies.has(child.ready.promise)) {
      this.dependencies.delete(child.ready.promise);

      if (this.dependencies.size === 0) {
        this._ready();
      }
    }
  }
}

module.exports = { RemovableAsyncNode }