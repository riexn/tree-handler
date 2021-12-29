import treeHandler from '../src/treeHandler';

const dataTree = {
  id: '1',
  tag: 'pending',
  subtasks: [
    { id: '2', tag: 'pending', subtasks: [] },
    {
      id: '3',
      tag: 'in progress',
      subtasks: [
        { id: '4', tag: 'pending', subtasks: [] },
        { id: '5', tag: 'pending', subtasks: [] },
      ],
    },
    { id: '4', tag: 'complete', subtasks: [] },
  ],
};

const tree = treeHandler.parse(dataTree, { childrenProperty: 'subtasks' });
const newTree = tree.filter((node) => {
  return node.model.tag === 'pending';
});
console.log('new tree', newTree);
