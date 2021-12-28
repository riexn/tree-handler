import { TreeNode } from './TreeNode';

export interface TreeModel {
  children: TreeModel[];
  [key: string]: any;
}

type MyInterface<children extends string> = {
  [prop in children]: string;
};

const test: MyInterface<'children'> = {};

export interface TreeHandlerConstructor {
  model: TreeModel;
}

export interface ParseConfigProps {
  childrenProperty: string;
}

export interface PredicateFunction<T extends TreeModel> {
  (node: TreeNode<T>): boolean;
}

export interface ForEachFunction<T extends TreeModel> {
  (node: TreeNode<T>): void;
}

export interface MoveUnderParentProps<T extends TreeModel> {
  node: PredicateFunction<T>;
  toParent: PredicateFunction<T>;
  atIndex?: number;
}

export interface MoveToSiblingProps<T extends TreeModel> {
  node: PredicateFunction<T>;
  toSibling: PredicateFunction<T>;
  at: 'BEFORE' | 'AFTER';
}
