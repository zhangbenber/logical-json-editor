export enum PortDirection {
  IN,
  OUT,
}

export enum NodeType {
  INPUT,
  OUTPUT,
  LOGICAL,
}

export enum MouseMovmentType {
  NONE,
  DRAG_NODE,
}

export interface Graph {
  nodes: Array<Node | undefined>;
  links: Link[];
}

export interface Port {
  name: string;
  direction: PortDirection;
}

export interface Node {
  type: NodeType;
  name: string;
  x: number;
  y: number;
  width: number;
  ports: Port[];
  portMap: { [name: string]: number };
  collapsed: boolean;
  selected: boolean;
}

export interface PortRef {
  nodeId: number;
  portName: string;
}

export interface Link {
  id: number;
  from: PortRef;
  to: PortRef;
  selected: boolean;
}

export interface Dimension {
  oX: number;
  oY: number;
  scale: number;
}

export interface MouseMovment {
  type: MouseMovmentType;
  x: number;
  y: number;
  startX: number;
  startY: number;
}

export interface Sheet {
  name: string;
  dimension: Dimension;
  graph: Graph;
}

export interface Document {
  sheets: Sheet[];
}