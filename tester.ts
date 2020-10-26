import treeHandler from './src';

const data = {
  id: 'A',
  children: [
    { id: 'B', children: [] },
    { id: 'C', children: [] },
    { id: 'K', children: [] },
  ],
};

const tree = treeHandler.parse(data);

const flatNodes = tree.flatten();
console.log(flatNodes);
// console.log(tree????)
