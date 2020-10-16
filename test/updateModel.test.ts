import treeHandler from '../src/index';

describe('Node Model Update', () => {
  it('should update the node model without breaking reference', () => {
    const modelA = {
      id: 'A',
      fruit: 'apple',
      children: [
        { id: 'B', fruit: 'orange', children: [] },
        { id: 'C', fruit: 'cucumber', children: [] },
      ],
    };
    const modelAUpdated = {
      id: 'A',
      fruit: 'apple',
      children: [
        { id: 'B', fruit: 'orange', children: [] },
        { id: 'C', fruit: 'banana', children: [] },
      ],
    };
    const tree = treeHandler.parse(modelA);
    const node = tree.findOne((node) => node.model.fruit === 'cucumber');
    node!.model = { id: 'C', fruit: 'banana' };
    expect(tree.model).toStrictEqual(modelAUpdated);
  });
  it('should update the node model without changing the children property', () => {
    const modelA = {
      id: 'A',
      fruit: 'apple',
      children: [
        { id: 'B', fruit: 'orange', children: [] },
        {
          id: 'C',
          fruit: 'cucumber',
          children: [{ id: 'D', fruit: 'strawberry', children: [] }],
        },
      ],
    };
    const modelAUpdated = {
      id: 'A',
      fruit: 'apple',
      children: [
        { id: 'B', fruit: 'orange', children: [] },
        {
          id: 'C',
          fruit: 'banana',
          children: [{ id: 'D', fruit: 'strawberry', children: [] }],
        },
      ],
    };
    const tree = treeHandler.parse(modelA);
    const node = tree.findOne((node) => node.model.fruit === 'cucumber');
    node!.model = { id: 'C', fruit: 'banana', children: [] } as any;
    expect(tree.model).toStrictEqual(modelAUpdated);
  });
});
