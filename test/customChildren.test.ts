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

    expect(tree.model).toStrictEqual({
      id: 'A',
      subtasks: [
        { id: 'B', subtasks: [] },
        { id: 'C', subtasks: [] },
        { id: 'K', subtasks: [] },
        { id: 'whatever', subtasks: [] },
      ],
    });
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

    expect(tree.model).toStrictEqual({
      id: 'A',
      subtasks: [
        { id: 'B', subtasks: [] },
        { id: 'C', subtasks: [] },
        { id: 'K', subtasks: [] },
        { id: 'whatever', subtasks: [] },
      ],
    });
  });

  test('Modify Node With Custom Children Property', () => {
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

    const node = tree.findOne((node) => node.model.id === 'K');
    if (node) {
      node.model = { ...node.model, potato: true };
    }

    expect(tree.model).toStrictEqual({
      id: 'A',
      subtasks: [
        { id: 'B', subtasks: [] },
        { id: 'C', subtasks: [] },
        { id: 'K', potato: true, subtasks: [] },
      ],
    });
  });
  test('Remove Node With Custom Children Property', () => {
    const dataTree = {
      id: 'A',
      subtasks: [
        { id: 'B', subtasks: [] },
        { id: 'C', subtasks: [] },
        { id: 'K', subtasks: [] },
        { id: 'whatever', subtasks: [] },
      ],
    };

    const tree = treeHandler.parse(dataTree, {
      childrenProperty: 'subtasks',
    });

    const node = tree.findOne((node) => node.model.id === 'whatever');
    if (node) {
      node.delete();
    }

    expect(tree.model).toStrictEqual({
      id: 'A',
      subtasks: [
        { id: 'B', subtasks: [] },
        { id: 'C', subtasks: [] },
        { id: 'K', subtasks: [] },
      ],
    });
  });
});
