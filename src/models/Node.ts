import * as I from '../typings';

let lastId = 0;

export default class Node implements I.Node {
  public id = lastId++;
  public x = 0;
  public y = 0;
  public width = 6;
  public ports: I.Port[] = [];
  public collapsed = false;
  public selected = false;

  constructor(
    public type: I.NodeType,
    public name: string,
  ) { }

  public moveTo(
    x: number = this.x,
    y: number = this.y,
    width: number = this.width,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
  }
}