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
});
