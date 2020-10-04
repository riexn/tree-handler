import treeHandler, { TreeNode } from '../src/index';

describe('move a node under a parent', () => {
  it('move a node under a new parent', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [{ id: 'B1', children: [] }] },
        { id: 'C', children: [] },
      ],
    };
    const modelAMoved = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [{ id: 'B1', children: [] }] },
      ],
    };
    const tree = treeHandler.parse(modelA);
    tree.moveUnderParnet({
      node: (node) => node.model.id === 'B1',
      toParent: (node) => node.model.id === 'C',
    });
    expect(tree.model).toStrictEqual(modelAMoved);
  });

  it('move a node under a new parent, under a specified index', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [{ id: 'B1', children: [] }] },
        {
          id: 'C',
          children: [
            { id: 'C1', children: [] },
            { id: 'C2', children: [] },
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
          ],
        },
      ],
    };
    const tree = treeHandler.parse(modelA);
    tree.moveUnderParnet({
      node: (node) => node.model.id === 'B1',
      toParent: (node) => node.model.id === 'C',
      atIndex: 1,
    });
    expect(tree.model).toStrictEqual(modelAMoved);
  });

  it('throw error when moving a node that does not exist', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [{ id: 'B1', children: [] }] },
        {
          id: 'C',
          children: [
            { id: 'C1', children: [] },
            { id: 'C2', children: [] },
          ],
        },
      ],
    };
    const tree = treeHandler.parse(modelA);

    expect(() => {
      tree.moveUnderParnet({
        node: (node) => node.model.id === 'K1',
        toParent: (node) => node.model.id === 'C',
        atIndex: 1,
      });
    }).toThrowError(`The to-be moved node doesn't exist in this tree`);
  });

  it('throw error when moving to a parent that does not exist', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [{ id: 'B1', children: [] }] },
        {
          id: 'C',
          children: [
            { id: 'C1', children: [] },
            { id: 'C2', children: [] },
          ],
        },
      ],
    };
    const tree = treeHandler.parse(modelA);

    expect(() => {
      tree.moveUnderParnet({
        node: (node) => node.model.id === 'B',
        toParent: (node) => node.model.id === 'KC',
        atIndex: 1,
      });
    }).toThrowError(`Parent node doesn't exist in this tree`);
  });

  it('throw error when moving a node to a child index that is less than 0', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [{ id: 'B1', children: [] }] },
        {
          id: 'C',
          children: [
            { id: 'C1', children: [] },
            { id: 'C2', children: [] },
          ],
        },
      ],
    };
    const tree = treeHandler.parse(modelA);

    expect(() => {
      tree.moveUnderParnet({
        node: (node) => node.model.id === 'B',
        toParent: (node) => node.model.id === 'C',
        atIndex: -1,
      });
    }).toThrowError(`the specified index is outside the node's children range`);
  });

  it('throw error when moving a node to a child index that is beyond the array length', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [{ id: 'B1', children: [] }] },
        {
          id: 'C',
          children: [
            { id: 'C1', children: [] },
            { id: 'C2', children: [] },
          ],
        },
      ],
    };
    const tree = treeHandler.parse(modelA);

    expect(() => {
      tree.moveUnderParnet({
        node: (node) => node.model.id === 'B',
        toParent: (node) => node.model.id === 'C',
        atIndex: 10,
      });
    }).toThrowError(`the specified index is outside the node's children range`);
  });

  it('throw error when moving a node to a child index that is beyond the array length', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [{ id: 'B1', children: [] }] },
        {
          id: 'C',
          children: [
            { id: 'C1', children: [] },
            { id: 'C2', children: [] },
          ],
        },
      ],
    };
    const tree = treeHandler.parse(modelA);

    expect(() => {
      tree.moveUnderParnet({
        node: (node) => node.model.id === 'B',
        toParent: (node) => node.model.id === 'C',
        atIndex: 10,
      });
    }).toThrowError(`the specified index is outside the node's children range`);
  });

  it('throw error when moving a node to become its own child', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [{ id: 'B1', children: [] }] },
        {
          id: 'C',
          children: [
            { id: 'C1', children: [] },
            { id: 'C2', children: [] },
          ],
        },
      ],
    };
    const tree = treeHandler.parse(modelA);

    expect(() => {
      tree.moveUnderParnet({
        node: (node) => node.model.id === 'B',
        toParent: (node) => node.model.id === 'B1',
        atIndex: 10,
      });
    }).toThrowError(
      `A node cannot become its own child\nThis error is emitting because you are attempting to move a node under itself.`
    );
  });
});
