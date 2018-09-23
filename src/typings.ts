export enum PortDirection {
  IN,
  OUT,
}

export enum NodeType {
  INPUT,
  OUTPUT,
  LOGICAL,
}

export interface Graph {
  nodes: Node[];
  links: Link[];
}

export interface Port {
  name: string;
  direction: PortDirection;
  node?: Node;
}

export interface Node {
  type: NodeType;
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  inputs?: Port[];
  outputs?: Port[];
}

export interface InputNode extends Node {
  type: NodeType.INPUT;
}

export interface OutputNode extends Node {
  type: NodeType.OUTPUT;
}

export interface LogicalNode extends Node {
  type: NodeType.LOGICAL;
  inputs: Port[];
  outputs: Port[];
}

export interface Link {
  from: Port;
  to: Port;
}

export interface Dimension {
  oX: number;
  oY: number;
  scale: number;
}