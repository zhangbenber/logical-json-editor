import * as I from '../typings';

import Node from './Node';

export default class LogicalNode extends Node {
  constructor(name: string) {
    super(I.NodeType.LOGICAL, name);
    this.ports = this.getDefaultPort();
  }

  private getDefaultPort(): I.Port[] {
    // const { name } = this;
    return [
      {
        name: 'in',
        direction: I.PortDirection.IN,
        node: this,
      },
      {
        name: 'out',
        direction: I.PortDirection.OUT,
        node: this,
      }
    ]
  }
}