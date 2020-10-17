import treeHandler, { TreeNode } from '../src/index';

describe('Tree Parser', () => {
  it('should parse tree structure', () => {
    const modelA = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
      ],
    };
    const tree = treeHandler.parse(modelA);
    expect(tree.model).toStrictEqual(modelA);
    expect(tree).toBeInstanceOf(TreeNode);
  });

  it('Should give a clear error if an object with a children property that is not an array was parsed', () => {
    const modelA: any = {
      id: 'A',
      children: 123,
    };
    expect(() => {
      treeHandler.parse(modelA);
    }).toThrow('Children property must be of type Array');
  });

  it('should add empty children array when parsing', () => {
    const modelA: any = {
      id: 'A',
      children: [{ id: 'B' }, { id: 'C', children: [] }],
    };

    const modelAWChild = {
      id: 'A',
      children: [
        { id: 'B', children: [] },
        { id: 'C', children: [] },
      ],
    };
    const tree = treeHandler.parse(modelA);
    expect(tree.model).toStrictEqual(modelAWChild);
  });

  it('should add empty children array when parsing', () => {
    const modelA: any = {
      id: 'A',
    };

    const modelAWChild = {
      id: 'A',
      children: [],
    };
    const tree = treeHandler.parse(modelA);
    expect(tree.model).toStrictEqual(modelAWChild);
  });
});
