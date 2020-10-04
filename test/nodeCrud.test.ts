import treeHandler, { TreeNode } from '../src/index';

describe('TreeModel', () => {
  it('add child as TreeNode Type', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
      ],
    };

    const modelB = {
      id: 'K',
      children: [],
    };

    const combinedModels = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
        { id: 'K', children: [] },
      ],
    };
    const tree = treeHandler.parse(modelA);
    const childNode = treeHandler.parse(modelB);
    tree.addChild(childNode);
    expect(tree.model).toStrictEqual(combinedModels);
  });

  it('add child as TreeModel Type', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
      ],
    };

    const modelB = {
      id: 'K',
      children: [],
    };

    const combinedModels = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
        { id: 'K', children: [] },
      ],
    };
    const tree = treeHandler.parse(modelA);
    tree.addChild(modelB);
    expect(tree.model).toStrictEqual(combinedModels);
  });

  it('should throw error if the added child is not an object', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
      ],
    };

    const data: any = 1;
    const tree = treeHandler.parse(modelA);
    expect(() => {
      tree.addChild(data);
    }).toThrowError('node must be of type object');
  });

  it('remove a child', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
      ],
    };
    const modelAWithoutChild = {
      id: 'A',
      children: [{ id: 'C', children: [] }],
    };
    const tree = treeHandler.parse(modelA);
    const node = tree.findOne((node) => {
      return node.model.id === 'B';
    });
    node?.delete();
    expect(tree.model).toStrictEqual(modelAWithoutChild);
  });

  it('do nothing when removing root', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
      ],
    };
    const tree = treeHandler.parse(modelA);
    tree.delete();
    expect(tree.model).toStrictEqual(modelA);
  });

  it('find one node that matches condition', () => {
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

    expect(node?.model).toStrictEqual({ id: 'C', children: [] });
  });

  it("return undefined when finding a node that doesn't exist", () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
      ],
    };
    const tree = treeHandler.parse(modelA);
    const node = tree.findOne((node) => {
      return node.model.id === 'ABC';
    });

    expect(node).toStrictEqual(undefined);
  });

  it('find multiple nodes that match criteria', () => {
    const modelA = {
      id: 'A',
      type: 'cake',
      children: [
        { id: 'B', type: 'cake', children: [] },
        { id: 'C', children: [] },
        { id: 'K', children: [] },
      ],
    };
    const tree = treeHandler.parse(modelA);
    const nodes = tree.find((node) => {
      return node.model.type === 'cake';
    });
    const models = nodes.map((node) => node.model);

    expect(models).toStrictEqual([
      {
        id: 'A',
        type: 'cake',
        children: [
          { id: 'B', type: 'cake', children: [] },
          { id: 'C', children: [] },
          { id: 'K', children: [] },
        ],
      },
      { id: 'B', type: 'cake', children: [] },
    ]);
  });
});
