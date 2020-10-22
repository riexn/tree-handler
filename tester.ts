import treeHandler from './src';

const sample = {
  id: 'A',
  children: [
    { id: 'B', children: [{ id: 'B1', children: [] }] },
    {
      id: 'C',
      children: [
        { id: 'C1', children: [] },
        { id: 'C2', children: [] },
        { id: 'C3', children: [] },
      ],
    },
  ],
};

const sampleTargetA = {
  id: 'A',
  children: [
    { id: 'B', children: [{ id: 'B1', children: [] }] },
    {
      id: 'C',
      children: [
        { id: 'C2', children: [] },
        { id: 'C1', children: [] },
        { id: 'C3', children: [] },
      ],
    },
  ],
};

const sampleTargetB = {
  id: 'A',
  children: [
    { id: 'B', children: [{ id: 'B1', children: [] }] },
    {
      id: 'C',
      children: [
        { id: 'C1', children: [] },
        { id: 'C2', children: [] },
        { id: 'C3', children: [] },
      ],
    },
  ],
};

const sampleTargetC = {
  id: 'A',
  children: [
    { id: 'B', children: [{ id: 'B1', children: [] }] },
    {
      id: 'C',
      children: [
        { id: 'C3', children: [] },
        { id: 'C1', children: [] },
        { id: 'C2', children: [] },
      ],
    },
  ],
};

const sampleTargetD = {
  id: 'A',
  children: [
    { id: 'B', children: [{ id: 'B1', children: [] }] },
    {
      id: 'C',
      children: [
        { id: 'C1', children: [] },
        { id: 'C3', children: [] },
        { id: 'C2', children: [] },
      ],
    },
  ],
};

const tree = treeHandler.parse(sample);

tree.moveToSibling({
  node: (node) => node.model.id === 'C3',
  toSibling: (node) => node.model.id === 'C1',
  at: 'AFTER',
});

console.log(JSON.stringify(tree.model));
