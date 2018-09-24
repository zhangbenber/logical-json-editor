import * as I from '../typings';

import Node from './Node';

export default class OutputNode extends Node {
  constructor(name: string) {
    super(I.NodeType.OUTPUT, name);
    this.ports = [{
      name,
      direction: I.PortDirection.IN,
      node: this,
    }];
    this.collapsed = true;
  }

  public getPort(): I.Port {
    return this.ports[0];
  }
}