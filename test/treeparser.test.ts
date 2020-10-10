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

  it('Should give a clear error if an object without a children property was parsed', () => {
    const modelA: any = {
      id: 'A',
    };
    expect(() => {
      treeHandler.parse(modelA);
    }).toThrow('Each node must contain a children property of type array');
  });
});
