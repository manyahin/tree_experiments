const { AsyncNode } = require('./step_2');

// Step 3: RemovableAsyncNode class boilerplate
class RemovableAsyncNode extends AsyncNode {
  constructor(...args) {
    super(...args);

    this.parent = null;
    this.readyPromises = [this.ready.promise];
  }
  removeChild(child) {
    for (let i = 0; i < this.children.length; i++) {
      if (Object.is(this.children[i], child)) {
        console.log('- remove child!')

        // remove parent
        child.parent = null;

        // remove child from children
        this.children.splice(i, 1);

        // remove child from awaiting list
        // i + 1 because readyPromises also contain the node itself at 0 index
        this.readyPromises.splice(i + 1, 1);
      }
    }
  }
  addChild(child) {
    this.children.push(child);

    // swap children and parent
    if (child.parent && !Object.is(child.parent, this)) {
      console.log('- new parent!');

      const previousParent = child.parent;
      child.parent.removeChild(child);
      child.addChild(previousParent);
    }

    child.parent = this;

    this.readyPromises.push(child.whenReady(null));
  }
  async whenReady(callback) {
    await Promise.all(this.readyPromises);

    callback && callback();
  }
}

module.exports = { RemovableAsyncNode }