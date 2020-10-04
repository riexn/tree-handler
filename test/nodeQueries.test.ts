import treeHandler, { TreeNode } from '../src/index';

describe('TreeNode Queries', () => {
  it('first node should be root', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
      ],
    };
    const tree = treeHandler.parse(modelA);
    expect(tree.isRoot()).toBe(true);
  });

  it('child node should not root', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
      ],
    };
    const tree = treeHandler.parse(modelA);
    expect(tree.children[0].isRoot()).toBe(false);
  });

  it('check if a node is the child of this tree', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
      ],
    };
    const tree = treeHandler.parse(modelA);
    const node = tree.findOne((node) => {
      return node.model.id === 'C';
    });

    expect(tree.isParentOf(node!)).toBe(true);
  });

  it('check if a node is not the child of this tree', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
      ],
    };
    const tree = treeHandler.parse(modelA);
    const node = tree.findOne((node) => {
      return node.model.id === 'C';
    });

    expect(node!.isParentOf(tree)).toBe(false);
  });

  it('check if root is its own parent', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
      ],
    };
    const tree = treeHandler.parse(modelA);
    expect(tree.isParentOf(tree)).toBe(true);
  });

  it('should get the index of node between its siblings', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
      ],
    };
    const tree = treeHandler.parse(modelA);
    const node = tree.findOne((node) => node.model.id === 'C');

    expect(node?.getIndex()).toBe(1);
  });

  it('should return 0 when getting the index of the root node', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
      ],
    };
    const tree = treeHandler.parse(modelA);

    expect(tree.getIndex()).toBe(0);
  });
});
