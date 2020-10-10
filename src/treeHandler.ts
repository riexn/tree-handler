import { PredicateFunction, TreeHandlerConstructor, TreeModel } from './types';
import { TreeNode } from './TreeNode';

// Tree Parser
class TreeHandler {
  constructor() {}

  parse<T extends TreeModel>(model: T): TreeNode<T> {
    const node = new TreeNode(model);

    // check it if has children
    if (model.hasOwnProperty('children')) {
      // 'parse' each child, adding it as s child for this one
      model.children.map((child) => {
        this.addNodeToChild(node, this.parse(child));
      });
    } else {
      throw Error('Each node must contain a children property of type array');
    }

    return node;
  }

  private addNodeToChild<T extends TreeModel>(
    node: TreeNode<T>,
    child: TreeNode<T>
  ): TreeNode<T> {
    child.parent = node;
    node.children.push(child);
    return child;
  }
}

const treeHandler = new TreeHandler();
export default treeHandler;
