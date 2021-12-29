import {
  PredicateFunction,
  TreeModel,
  MoveToSiblingProps,
  MoveUnderParentProps,
  ForEachFunction,
} from './types';
import { clamp } from './utils';
import treeHandler from './treeHandler';
import { FilterConfig, ParseConfigProps } from '.';

export class TreeNode<T extends TreeModel> {
  private _model: T = {} as T;
  parent: TreeNode<T> | undefined = undefined;
  children: TreeNode<T>[] = [];
  config: ParseConfigProps;
  constructor(
    model: T,
    config: ParseConfigProps = { childrenProperty: 'children' }
  ) {
    if (!model[config.childrenProperty]) {
      (model as any)[config.childrenProperty] = [];
    }
    this.model = model;
    this.config = config;
  }

  set model(newModel: any) {
    // ommit changing the children if there is values in the model already
    const isNew = Object.keys(this._model).length === 0;
    if (isNew) {
      this._model = newModel as T;
    } else {
      const updatedModel: any = { ...newModel };
      delete updatedModel[this.config.childrenProperty];
      Object.assign(this._model, updatedModel);
    }
  }

  get model() {
    return this._model as T;
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

  // filter =
  //   (tag: string) =>
  //   ({ subtasks, ...node }: TreeNode) => {
  //     let filteredSubtasks: any[] = subtasks.flatMap(filter(tag));
  //     return node.tag === tag
  //       ? filteredSubtasks
  //       : [{ ...node, subtasks: filteredSubtasks }];
  //   };

  public filter(func: PredicateFunction<T>, baseNode: TreeNode<T>): any {
    const { children, ...node } = baseNode;
    let filteredChildren: TreeNode<T>[] | TreeNode<T> = children.flatMap(
      (child) => this.filter(func, child)
    );
    return !func(baseNode)
      ? filteredChildren
      : [{ ...baseNode, children: filteredChildren }];
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

    if (!siblingNode.parent) {
      throw Error('The root node cannot be a sibling');
    }

    srcNode.delete();
    // get the index after removing the node
    const siblingIndex = siblingNode.getIndex();
    const srcNewIndex = clamp(
      at === 'BEFORE' ? siblingIndex : siblingIndex + 1,
      0,
      siblingNode.parent.children.length!
    );
    siblingNode.parent.addChild(srcNode.model, srcNewIndex);
  }

  public delete(): any {
    if (this.parent) {
      const indexOfChild: number = this.parent.children.indexOf(this);
      this.parent.children.splice(indexOfChild, 1);
      this.parent.model[this.config.childrenProperty].splice(indexOfChild, 1);
      // update every parent of this node to have the new shape
      // send model to parent
      // parent will find the index of the child, remove it, then replace it with the updated one
      // then this parent will send it to its parent..
      this.parent = undefined;
      delete this.parent;
    }
    return this;
  }

  public addChild(child: any, index?: number): any;

  public addChild(child: TreeNode<T>, index?: number): any;

  public addChild(child: TreeModel | TreeNode<T>, index?: number): any {
    if (child instanceof TreeNode) {
      if (index !== undefined) {
        this._addChildAtIndex(child, index);
      } else {
        this._addAsLastChild(child);
      }
    } else if (child[this.config.childrenProperty] instanceof Array) {
      const node = treeHandler.parse(child, this.config);
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
    this.model[this.config.childrenProperty].push(child.model);
    this.children.push(child);
  }

  private _addChildAtIndex(child: TreeNode<T>, index: number): any {
    const indexOutsideRange: boolean =
      index < 0 || index > this.children.length;
    if (indexOutsideRange) {
      throw Error("the specified index is outside the node's children range");
    }
    child.parent = this;
    this.model[this.config.childrenProperty].splice(index, 0, child.model);
    this.children.splice(index, 0, child);
  }

  public flatten(): T[] {
    const flattenedNodes: T[] = [{ ...this.model }];

    if (this.children.length > 0) {
      return flattenedNodes.concat(
        this.children
          .map((child) => child.flatten())
          .reduce((a: T[], b: T[]) => a.concat(b), [])
      );
    }

    return flattenedNodes;
  }

  public getIndex(): number {
    if (this.parent === undefined) {
      return 0;
    }
    return this.parent.children.indexOf(this);
  }

  public forEach(func: ForEachFunction<T>): void {
    func(this);
    this.children.map((child) => {
      child.forEach(func);
    });
  }
}
