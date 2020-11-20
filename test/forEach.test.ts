import treeHandler from '../src/index';

describe('forEach nodes traverser', () => {
  test('loop across all nodes, and modify their properties', () => {
    const dataTree: any = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        {
          id: 'C',
          children: [{ id: 'K', children: [{ id: 'J', children: [] }] }],
        },
        ,
      ],
    };

    const dataTreeLooped: any = {
      id: 'A',
      title: 'ABC',
      children: [
        { id: 'B', title: 'ABC', children: [] },
        {
          id: 'C',
          title: 'ABC',
          children: [
            {
              id: 'K',
              title: 'ABC',
              children: [{ id: 'J', title: 'ABC', children: [] }],
            },
          ],
        },
        ,
      ],
    };

    const tree = treeHandler.parse(dataTree);
    tree.forEach((node) => {
      node.model = { ...node.model, title: 'ABC' };
    });

    expect(tree.model).toStrictEqual(dataTreeLooped);
  });

  test('loop across all nodes, and modify their properties based on a condition', () => {
    const dataTree: any = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        {
          id: 'C',
          children: [{ id: 'K', children: [{ id: 'J', children: [] }] }],
        },
        ,
      ],
    };

    const dataTreeLooped: any = {
      id: 'A',
      title: 'ABC',
      children: [
        { id: 'B', title: 'ABC', children: [] },
        {
          id: 'C',
          title: 'ABC',
          children: [
            {
              id: 'K',
              title: 'This is K',
              children: [{ id: 'J', title: 'ABC', children: [] }],
            },
          ],
        },
        ,
      ],
    };

    const tree = treeHandler.parse(dataTree);
    tree.forEach((node) => {
      if (node.model.id === 'K') {
        node.model = { title: 'This is K' };
      } else {
        node.model = { title: 'ABC' };
      }
    });

    expect(tree.model).toStrictEqual(dataTreeLooped);
  });
});
