import treeHandler from '../src/index';

describe('Custom Children Property', () => {
  test('Parse Tree With Custom Children Property', () => {
    const dataTree = {
      id: 'A',
      subtasks: [
        { id: 'B', subtasks: [] },
        { id: 'C', subtasks: [] },
        { id: 'K', subtasks: [] },
      ],
    };

    const tree = treeHandler.parse(dataTree, { childrenProperty: 'subtasks' });
    expect(tree.model).toBe(dataTree);
  });
  test('Add Node With Custom Children Property', () => {
    const dataTree = {
      id: 'A',
      subtasks: [
        { id: 'B', subtasks: [] },
        { id: 'C', subtasks: [] },
        { id: 'K', subtasks: [] },
      ],
    };

    const tree = treeHandler.parse(dataTree, {
      childrenProperty: 'subtasks',
    });

    tree.addChild({ id: 'whatever', subtasks: [] });

    expect(tree.model).toBe(dataTree);
  });
});
