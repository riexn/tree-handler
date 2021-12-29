import treeHandler from '../src/index';

describe('Custom Children Property', () => {
  test('Parse Tree With Custom Children Property', () => {
    const dataTree = {
      id: '1',
      tag: 'pending',
      subtasks: [
        { id: '2', tag: 'pending', subtasks: [] },
        {
          id: '3',
          tag: 'in progress',
          subtasks: [
            {
              id: '4',
              tag: 'pending',
              subtasks: [
                {
                  id: '6',
                  tag: 'complete',
                  subtasks: [
                    {
                      id: '10',
                      tag: 'pending',
                      subtasks: [{ id: '10', tag: 'complete', subtasks: [] }],
                    },
                  ],
                },
                { id: '7', tag: 'complete', subtasks: [] },
              ],
            },
            { id: '5', tag: 'pending', subtasks: [] },
          ],
        },
        { id: '4', tag: 'complete', subtasks: [] },
      ],
    };

    const tree = treeHandler.parse(dataTree, { childrenProperty: 'subtasks' });
    const newTree = tree.filter((node) => node.model.tag !== 'in progress');
    // TODO: maybe we need to genrate new trees after we parse them? :)
    console.log('new tree', newTree);
    expect(tree.model).toBe(dataTree);
  });
});
