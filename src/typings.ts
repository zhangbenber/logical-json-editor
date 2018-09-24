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
  node: Node;
}

export interface Node {
  type: NodeType;
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  ports: Port[];
  collapsed: boolean;
  selected: boolean;
}

export interface Link {
  id: number;
  from: Port;
  to: Port;
  selected: boolean;
}

export interface Dimension {
  oX: number;
  oY: number;
  scale: number;
}