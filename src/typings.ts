export enum Direction {
  IN,
  OUT,
}

export interface Graph {
  oX: number;
  oY: number;
  scale: number;
  nodes: Node[];
  links: Link[];
}

export interface Port {
  name: string;
  direction: Direction;
  node: Node;
}

export interface Node {
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
}

export interface InputNode extends Node { }

export interface OutputNode extends Node { }

export interface LogicalNode extends Node {
  inputs: Port[];
  outputs: Port[];
}

export interface Link {
  from: Port;
  to: Port;
}