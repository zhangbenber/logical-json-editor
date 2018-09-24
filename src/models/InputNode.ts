import * as I from '../typings';

import Node from './Node';

export default class InputNode extends Node {
  constructor(name: string) {
    super(I.NodeType.INPUT, name);
    this.ports = [{
      name,
      direction: I.PortDirection.OUT,
      node: this,
    }];
    this.collapsed = true;
  }

  public getPort(): I.Port {
    return this.ports[0];
  }
}