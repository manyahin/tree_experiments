// Async resource implementation
class Resource {
  constructor(onReadyCallback) {
    setTimeout(() => onReadyCallback.call(this, this.value),
      Math.random() * 1000);
  }
  get value() {
    if (!this._value) {
      this._value = 'xxxxxxxxxxxxxxxx'.replace(/x/g,
        () => Math.round(Math.random() * 15).toString(16));
    }
    return this._value;
  }
}

// Step 1: Node class boilerplate
class Node {
  constructor() {
    this.res = new Resource(this.onResourceReady.bind(this));
    this.children = new Set();

    this.resourceReady = 0;
  }
  onResourceReady() {
    this.resourceReady = 1;
  }
  addChild(child) {
    this.children.add(child);
  }
  isReady() {
    return Node.traverse(this);
  }
  static traverse(node) {
    if (!node.resourceReady) return false;

    if (node.children.size) {
      for (let child of node.children) {
        if (!Node.traverse(child))
          return false;
      }
    }

    return true;
  }
}

module.exports = { Resource, Node }
