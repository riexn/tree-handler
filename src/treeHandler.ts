import { PredicateFunction, TreeHandlerConstructor, TreeModel } from './types';
import { TreeNode } from './TreeNode';
import { ParseConfigProps } from '.';

// Tree Parser
class TreeHandler {
  constructor() {}

  parse<T extends TreeModel>(
    model: any,
    config: ParseConfigProps = { childrenProperty: 'children' }
  ): TreeNode<T> {
    const node = new TreeNode(model);

    // check it if has children
    if (
      model[config.childrenProperty] &&
      Array.isArray(model[config.childrenProperty])
    ) {
      // 'parse' each child, adding it as s child for this one
      model[config.childrenProperty].map((child: any) => {
        this.addNodeToChild(node, this.parse(child));
      });
    } else {
      throw Error('Children property must be of type Array');
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
