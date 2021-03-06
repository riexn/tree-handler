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

  it('should move between siblings of the same array', () => {
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
            { id: 'C2', children: [] },
            { id: 'C1', children: [] },
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

    const treeA = treeHandler.parse(JSON.parse(JSON.stringify(sample)));

    treeA.moveToSibling({
      node: (node) => node.model.id === 'C1',
      toSibling: (node) => node.model.id === 'C2',
      at: 'AFTER',
    });

    expect(treeA.model).toStrictEqual(sampleTargetA);

    const treeB = treeHandler.parse(JSON.parse(JSON.stringify(sample)));

    treeB.moveToSibling({
      node: (node) => node.model.id === 'C2',
      toSibling: (node) => node.model.id === 'C1',
      at: 'BEFORE',
    });

    expect(treeB.model).toStrictEqual(sampleTargetB);

    const treeC = treeHandler.parse(JSON.parse(JSON.stringify(sample)));

    treeC.moveToSibling({
      node: (node) => node.model.id === 'C3',
      toSibling: (node) => node.model.id === 'C1',
      at: 'BEFORE',
    });

    expect(treeC.model).toStrictEqual(sampleTargetC);

    const treeD = treeHandler.parse(JSON.parse(JSON.stringify(sample)));

    treeD.moveToSibling({
      node: (node) => node.model.id === 'C3',
      toSibling: (node) => node.model.id === 'C1',
      at: 'AFTER',
    });

    expect(treeD.model).toStrictEqual(sampleTargetD);
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

  it('should have the new parent after being moved', () => {
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

    tree.moveToSibling({
      node: (node) => node.model.id === 'B1',
      toSibling: (node) => node.model.id === 'C3',
      at: 'AFTER',
    });

    const node = tree.findOne((node) => node.model.id === 'B1');

    expect(node?.parent).not.toStrictEqual(undefined);
  });
});
