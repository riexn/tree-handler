import {
  PredicateFunction,
  TreeModel,
  MoveToSiblingProps,
  MoveUnderParentProps,
} from './types';
import { clamp } from './utils';
import treeHandler from './treeHandler';

export class TreeNode<T extends TreeModel> {
  model: T = {} as T;
  parent: TreeNode<T> | undefined = undefined;
  children: TreeNode<T>[] = [];
  constructor(model: T) {
    this.model = model;
  }

  public isRoot(): boolean {
    return this.parent === undefined;
  }

  public find(func: PredicateFunction<T>): TreeNode<T>[] {
    let result: TreeNode<T>[] = [];
    if (func(this)) {
      result.push(this);
    }
    this.children.map((child) => {
      const test = child.find(func);
      result = result.concat(...test);
    });

    return result;
  }

  public findOne(func: PredicateFunction<T>): TreeNode<T> | undefined {
    let result = undefined;
    if (func(this)) {
      return this;
    } else {
      if (this.children.length > 0) {
        for (let index = 0; index < this.children.length; index++) {
          const element = this.children[index];
          result = element.findOne(func);
          if (result) {
            break;
          }
        }
      }
    }
    return result;
  }

  public moveUnderParnet({
    node,
    toParent,
    atIndex,
  }: MoveUnderParentProps<T>): any {
    // check if nodes exist
    const srcNode = this.findOne(node);
    const parentNode = this.findOne(toParent);
    if (!srcNode) {
      throw Error(`The to-be moved node doesn't exist in this tree`);
    }
    if (!parentNode) {
      throw Error(`Parent node doesn't exist in this tree`);
    }

    // error if a node is attempting to become its own child
    if (srcNode.isParentOf(parentNode)) {
      throw Error(
        'A node cannot become its own child\nThis error is emitting because you are attempting to move a node under itself.'
      );
    }

    srcNode.delete();
    parentNode.addChild(srcNode, atIndex);
  }

  public moveToSibling({ node, toSibling, at }: MoveToSiblingProps<T>): any {
    // check if nodes exist
    const srcNode = this.findOne(node);
    const siblingNode = this.findOne(toSibling);
    if (!srcNode) {
      throw Error(`The to-be moved node doesn't exist in this tree`);
    }
    if (!siblingNode) {
      throw Error(`Sibling node doesn't exist in this tree`);
    }

    // error if a node is attempting to become its own child
    if (srcNode.isParentOf(siblingNode)) {
      throw Error(
        'A node cannot become its own child\nThis error is emitting because you are attempting to move a node under itself.'
      );
    }

    if (siblingNode.isRoot()) {
      throw Error('The root node cannot be a sibling');
    }

    const siblingIndex = siblingNode.getIndex();
    const srcNewIndex = clamp(
      at === 'BEFORE' ? siblingIndex : siblingIndex + 1,
      0,
      siblingNode.parent?.children.length!
    );
    srcNode.delete();
    siblingNode.parent?.addChild(srcNode, srcNewIndex);
  }

  public delete(): any {
    if (this.parent) {
      const indexOfChild: number = this.parent.children.indexOf(this);
      this.parent.children.splice(indexOfChild, 1);
      this.parent.model.children.splice(indexOfChild, 1);
      // update every parent of this node to have the new shape
      // send model to parent
      // parent will find the index of the child, remove it, then replace it with the updated one
      // then this parent will send it to its parent..
      this.parent = undefined;
      delete this.parent;
    }
    return this;
  }

  public addChild(child: TreeModel, index?: number): any;

  public addChild(child: TreeNode<T>, index?: number): any;

  public addChild(child: TreeModel | TreeNode<T>, index?: number): any {
    if (child instanceof TreeNode) {
      if (index !== undefined) {
        this._addChildAtIndex(child, index);
      } else {
        this._addAsLastChild(child);
      }
    } else if ((child as TreeModel).children instanceof Array) {
      const node = treeHandler.parse(child);
      this.addChild(node, index);
    } else {
      throw Error('node must be of type object');
    }
  }
  public isParentOf(childNode: TreeNode<T>): any {
    const node = this.findOne((node) => node === childNode);
    return node ? true : false;
  }

  private _addAsLastChild(child: TreeNode<T>): any {
    child.parent = this;
    this.model.children.push(child.model);
    this.children.push(child);
  }

  private _addChildAtIndex(child: TreeNode<T>, index: number): any {
    const indexOutsideRange: boolean =
      index < 0 || index > this.children.length;
    if (indexOutsideRange) {
      throw Error("the specified index is outside the node's children range");
    }

    this.model.children.splice(index, 0, child.model);
    this.children.splice(index, 0, child);
  }

  public getIndex(): number {
    if (this.parent === undefined) {
      return 0;
    }
    return this.parent.children.indexOf(this);
  }
}
