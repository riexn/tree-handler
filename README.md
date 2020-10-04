# Tree Handler
tree-handler is a module to easily manipulate tree structures.
## API
### Parse tree
```ts
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
```ts
const node = tree.find((node) => node.model.type === "cake")
```

### Add a new node as an object
```ts
const node = tree.addChild({id:"123", type:"chocolate", children:[]})
```

### Add a new node as a node
```ts
const newNode = treeHandler.parse({
  id: "123",
  type: "chocolate",
  children: []
});
tree.addChild(newNode);
```

### Delete a node
```ts
const node = tree.findOne((node) => node.model.id === "A");
node.delete();
```

### Move a node under a new parent
```ts
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

tree.moveUnderParnet({
  node: (node) => node.model.id === "B1",
  toParent: (node) => node.model.id === "C",
  atIndex:1
});
```

### Move a node next to a sibling
```ts
tree.moveToSibling({
  node: (node) => node.model.id === "B1",
  toSibling: (node) => node.model.id === "C2",
  at: "BEFORE" // options: BEFORE, AFTER
});
```