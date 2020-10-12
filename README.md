[![Build Status](https://travis-ci.org/riexn/tree-handler.svg?branch=main)](https://travis-ci.org/riexn/tree-handler)
[![codecov](https://codecov.io/gh/riexn/tree-handler/branch/main/graph/badge.svg)](https://codecov.io/gh/riexn/tree-handler)
[![npm version](https://badge.fury.io/js/tree-handler.svg)](https://badge.fury.io/js/tree-handler)
# Tree Handler
tree-handler is a module to easily manipulate tree structures.
## API
### Parse tree
```js
import treeHandler from "tree-handler";
const model = {
  id: "root",
  children: [
    { id: "A", children: [] },
    { id: "B", children: [] }
  ]
};
const tree = treeHandler.parse(model);
```

### Find a single node that matches a criteria
```js
Node tree.findOne((node) => node.model.id === "A");
```

### Find many nodes that match a criteria
```js
Array<Node> tree.find((node) => node.model.type === "cake")
```

### Add a new node as an object
```js
Node tree.addChild({id:"123", type:"chocolate", children:[]})
```

### Add a new node as a node
```js
const newNode = treeHandler.parse({
  id: "123",
  type: "chocolate",
  children: []
});
Node tree.addChild(newNode);
```

### Delete a node
```js
const node = tree.findOne((node) => node.model.id === "A");
Node node.delete();
```

### Move a node under a new parent
```js
const modelA = {
  id: "A",
  children: [
    { id: "B", children: [{ id: "B1", children: [] }] },
    {
      id: "C",
      children: [
        { id: "C1", children: [] },
        { id: "C2", children: [] }
      ]
    }
  ]
};

const tree = treeHandler.parse(modelA);

Node tree.moveUnderParnet({
  node: (node) => node.model.id === "B1",
  toParent: (node) => node.model.id === "C",
  atIndex:1
});
```

### Move a node next to a sibling
```js
Node tree.moveToSibling({
  node: (node) => node.model.id === "B1",
  toSibling: (node) => node.model.id === "C2",
  at: "BEFORE" // options: BEFORE, AFTER
});
```
