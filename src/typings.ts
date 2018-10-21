import * as React from 'react';

export enum PortDirection {
  IN,
  OUT,
}

export enum NodeType {
  INPUT,
  OUTPUT,
  LOGICAL,
}

export enum PortType {
  STRING,
  NUMBER,
  BOOLEAN,
  OBJECT,
  ANY,
}

export enum MouseMovmentType {
  NONE,
  MOVE_NODE,
  CREATE_LINK,
}

export interface Graph {
  nodes: Array<Node | undefined>;
  links: Array<Link | undefined>;
}

export interface Port {
  name: string;
  direction: PortDirection;
  constant?: any;
  constantInput?: any;
  constantError?: boolean;
  linkIds: number[];
}

export interface Node {
  id: number;
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
  data?: any;
}

export interface Sheet {
  name: string;
  dimension: Dimension;
  graph: Graph;
}

export interface Document {
  sheets: Sheet[];
}

export interface NodeCategoryMeta {
  category: string;
  nodes: NodeMeta[];
}

export interface NodeMeta {
  type: NodeType;
  name: string;
  label: string;
  desc: string;
  portGroups: PortGroupMeta[];
}

export interface PortGroupMeta {
  extendable: boolean;
  defaultPairs?: number;
  ports: PortMeta[];
}

export interface PortMeta {
  name: string;
  direction: PortDirection;
  type: PortType;
  desc: string;
}

export type LogicalJSONIONode = [number, string];
export type LogicalJSONLogicalNode = [number, string, object?];
export type LogicalJSONPort = number | [number, string];
export type LogicalJSONLink = [LogicalJSONPort, LogicalJSONPort];

export interface LogicalJSON {
  i: LogicalJSONIONode[];
  o: LogicalJSONIONode[];
  n: LogicalJSONLogicalNode[];
  l: LogicalJSONLink[];
}

export interface DialogButtonMeta {
  text: string;
  close?: boolean;
  primary?: boolean;
  onClick?: () => void;
}

export interface DialogMeta {
  width?: number;
  height?: number;
  title?: string;
  buttons?: DialogButtonMeta[];
  children?: React.ReactNode;
  padding?: any;
}