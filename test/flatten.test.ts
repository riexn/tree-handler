import treeHandler from '../src/index';

describe('Flatten Tree To Array of Nodes', () => {
  test('flatten tree to array of nodes', () => {
    const dataTree = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
        { id: 'K', children: [] },
      ],
    };
    const dataFlat = [
      {
        id: 'A',
        children: [
          { id: 'B', children: [] },
          { id: 'C', children: [] },
          { id: 'K', children: [] },
        ],
      },
      { id: 'B', children: [] },
      { id: 'C', children: [] },
      { id: 'K', children: [] },
    ];

    const tree = treeHandler.parse(dataTree);
    const flat = tree.flatten();
    expect(flat).toStrictEqual(dataFlat);
  });

  test('Flatten from a child node', () => {
    const dataTree = {
      id: 'A',
      children: [
        {
          id: 'B',
          children: [{ id: 'C', children: [{ id: 'K', children: [] }] }],
        },
      ],
    };
    const dataFlat = [
      { id: 'C', children: [{ id: 'K', children: [] }] },
      { id: 'K', children: [] },
    ];

    const tree = treeHandler.parse(dataTree);
    const node = tree.findOne((node) => node.model.id === 'C');
    const flat = node?.flatten();
    expect(flat).toStrictEqual(dataFlat);
  });
});
