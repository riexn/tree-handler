import treeHandler, { TreeNode } from '../src/index';

describe('move to sibling', () => {
  it('should move a node before the first sibling', () => {
    const modelA = {
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

    const modelAMoved = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        {
          id: 'C',
          children: [
            { id: 'B1', children: [] },
            { id: 'C1', children: [] },
            { id: 'C2', children: [] },
            { id: 'C3', children: [] },
          ],
        },
      ],
    };
    const tree = treeHandler.parse(modelA);
    tree.moveToSibling({
      node: (node) => node.model.id === 'B1',
      toSibling: (node) => node.model.id === 'C1',
      at: 'BEFORE',
    });

    expect(tree.model).toStrictEqual(modelAMoved);
  });

  it('should move a node after the first sibling', () => {
    const modelA = {
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

    const modelAMoved = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        {
          id: 'C',
          children: [
            { id: 'C1', children: [] },
            { id: 'B1', children: [] },
            { id: 'C2', children: [] },
            { id: 'C3', children: [] },
          ],
        },
      ],
    };
    const tree = treeHandler.parse(modelA);
    tree.moveToSibling({
      node: (node) => node.model.id === 'B1',
      toSibling: (node) => node.model.id === 'C1',
      at: 'AFTER',
    });

    expect(tree.model).toStrictEqual(modelAMoved);
  });
  it('should move a node before a middle sibling', () => {
    const modelA = {
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

    const modelAMoved = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        {
          id: 'C',
          children: [
            { id: 'C1', children: [] },
            { id: 'B1', children: [] },
            { id: 'C2', children: [] },
            { id: 'C3', children: [] },
          ],
        },
      ],
    };
    const tree = treeHandler.parse(modelA);
    tree.moveToSibling({
      node: (node) => node.model.id === 'B1',
      toSibling: (node) => node.model.id === 'C2',
      at: 'BEFORE',
    });

    expect(tree.model).toStrictEqual(modelAMoved);
  });
  it('should move a node after a middle sibling', () => {
    const modelA = {
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

    const modelAMoved = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        {
          id: 'C',
          children: [
            { id: 'C1', children: [] },
            { id: 'C2', children: [] },
            { id: 'B1', children: [] },
            { id: 'C3', children: [] },
          ],
        },
      ],
    };
    const tree = treeHandler.parse(modelA);
    tree.moveToSibling({
      node: (node) => node.model.id === 'B1',
      toSibling: (node) => node.model.id === 'C2',
      at: 'AFTER',
    });

    expect(tree.model).toStrictEqual(modelAMoved);
  });
  it('should move a node before the last sibling', () => {
    const modelA = {
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

    const modelAMoved = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        {
          id: 'C',
          children: [
            { id: 'C1', children: [] },
            { id: 'C2', children: [] },
            { id: 'B1', children: [] },
            { id: 'C3', children: [] },
          ],
        },
      ],
    };
    const tree = treeHandler.parse(modelA);
    tree.moveToSibling({
      node: (node) => node.model.id === 'B1',
      toSibling: (node) => node.model.id === 'C3',
      at: 'BEFORE',
    });

    expect(tree.model).toStrictEqual(modelAMoved);
  });

  it('should move a node after the last sibling', () => {
    const modelA = {
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

    const modelAMoved = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        {
          id: 'C',
          children: [
            { id: 'C1', children: [] },
            { id: 'C2', children: [] },
            { id: 'C3', children: [] },
            { id: 'B1', children: [] },
          ],
        },
      ],
    };
    const tree = treeHandler.parse(modelA);
    tree.moveToSibling({
      node: (node) => node.model.id === 'B1',
      toSibling: (node) => node.model.id === 'C3',
      at: 'AFTER',
    });

    expect(tree.model).toStrictEqual(modelAMoved);
  });

  it('should move a node after the last sibling', () => {
    const modelA = {
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

    const modelAMoved = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        {
          id: 'C',
          children: [
            { id: 'C1', children: [] },
            { id: 'C2', children: [] },
            { id: 'C3', children: [] },
            { id: 'B1', children: [] },
          ],
        },
      ],
    };
    const tree = treeHandler.parse(modelA);
    tree.moveToSibling({
      node: (node) => node.model.id === 'B1',
      toSibling: (node) => node.model.id === 'C3',
      at: 'AFTER',
    });

    expect(tree.model).toStrictEqual(modelAMoved);
  });

  it('should throw error if the moved node does not exist', () => {
    const modelA = {
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

    const tree = treeHandler.parse(modelA);

    expect(() => {
      tree.moveToSibling({
        node: (node) => node.model.id === 'K1',
        toSibling: (node) => node.model.id === 'C3',
        at: 'AFTER',
      });
    }).toThrow(`The to-be moved node doesn't exist in this tree`);
  });

  it('should throw error if the sibling node does not exist', () => {
    const modelA = {
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

    const tree = treeHandler.parse(modelA);

    expect(() => {
      tree.moveToSibling({
        node: (node) => node.model.id === 'B1',
        toSibling: (node) => node.model.id === 'K3',
        at: 'AFTER',
      });
    }).toThrow(`Sibling node doesn't exist in this tree`);
  });

  it('should throw error if the sibling is a child of the moved node', () => {
    const modelA = {
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

    const tree = treeHandler.parse(modelA);

    expect(() => {
      tree.moveToSibling({
        node: (node) => node.model.id === 'C',
        toSibling: (node) => node.model.id === 'C3',
        at: 'AFTER',
      });
    }).toThrow(
      `A node cannot become its own child\nThis error is emitting because you are attempting to move a node under itself.`
    );
  });

  it('should throw error if the sibling is the root node', () => {
    const modelA = {
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

    const tree = treeHandler.parse(modelA);

    expect(() => {
      tree.moveToSibling({
        node: (node) => node.model.id === 'C',
        toSibling: (node) => node.model.id === 'A',
        at: 'AFTER',
      });
    }).toThrow(`The root node cannot be a sibling`);
  });
});
