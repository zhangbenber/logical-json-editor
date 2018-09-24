import * as I from '../typings';

export default class Graph implements I.Graph {
  public nodes: I.Node[] = [];
  public links: I.Link[] = [];

  public addNode(node: I.Node) {
    this.nodes.push(node);
    return node;
  }

  public removeNode(node: I.Node) {
    const index = this.nodes.indexOf(node);
    if (index > -1) {
      this.nodes.splice(index, 1);
    }
  }

  public addLink(link: I.Link) {
    this.links.push(link);
    return link;
  }

  public removeLink(link: I.Link) {
    const index = this.links.indexOf(link);
    if (index > -1) {
      this.links.splice(index, 1);
    }
  }
}