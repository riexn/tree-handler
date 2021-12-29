import treeHandler from '../src/index';

describe('Filter', () => {
  test('Merge the children to their parent position', () => {
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

    const treeResult = {
      id: '1',
      tag: 'pending',
      subtasks: [
        { id: '2', tag: 'pending', subtasks: [] },
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
        { id: '4', tag: 'complete', subtasks: [] },
      ],
    };

    const tree = treeHandler.parse(dataTree, { childrenProperty: 'subtasks' });
    const newTree = tree.filter(
      (node) => node.tag !== 'in progress',
      'mergeChildren'
    );
    expect(treeResult).toStrictEqual(newTree[0]?.model);
  });

  test('Remove children (default mode)', () => {
    const dataTree = {
      id: '1',
      tag: 'pending',
      subtasks: [
        {
          id: '2',
          tag: 'pending',
          subtasks: [
            { id: '4', tag: 'complete', subtasks: [] },
            { id: '46', tag: 'in progress', subtasks: [] },
          ],
        },
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
                      subtasks: [{ id: '11', tag: 'complete', subtasks: [] }],
                    },
                  ],
                },
                {
                  id: '7',
                  tag: 'complete',
                  subtasks: [{ id: '74', tag: 'in progress', subtasks: [] }],
                },
              ],
            },
            { id: '5', tag: 'pending', subtasks: [] },
          ],
        },
        { id: '4', tag: 'complete', subtasks: [] },
      ],
    };

    const treeResult = {
      id: '1',
      tag: 'pending',
      subtasks: [
        {
          id: '2',
          tag: 'pending',
          subtasks: [{ id: '4', tag: 'complete', subtasks: [] }],
        },
        { id: '4', tag: 'complete', subtasks: [] },
      ],
    };

    const tree = treeHandler.parse(dataTree, {
      childrenProperty: 'subtasks',
    });
    const newTree = tree.filter((node) => node.tag !== 'in progress');
    expect(treeResult).toStrictEqual(newTree?.model);
  });

  test('filter out root', () => {
    const dataTree = {
      id: '1',
      tag: 'pending',
      subtasks: [
        {
          id: '2',
          tag: 'pending',
          subtasks: [
            { id: '4', tag: 'complete', subtasks: [] },
            { id: '46', tag: 'in progress', subtasks: [] },
          ],
        },
      ],
    };
    const tree = treeHandler.parse(dataTree, {
      childrenProperty: 'subtasks',
    });

    const newTree = tree.filter((node) => node.tag !== 'pending');
    expect(newTree).toBe(undefined);
  });
});
