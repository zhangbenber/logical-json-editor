import * as I from './typings';

class ReducerFactory {
  constructor(private state: I.Graph) { }
  
  public test() {
    console.log(test);
  }

  public deselectAll() {
    this.state.links.forEach(link => link.selected = false);
    this.state.nodes.forEach(node => {
      if (node) {
        node.selected = false;
      }
    });
  }

  public selectNode(id: number, preserve: boolean) {
    if (!preserve) {
      this.deselectAll();
    }
    const node = this.state.nodes[id];
    if (node) {
      node.selected = true;
    }
  }

}

export default (state: I.Graph) => new ReducerFactory(state);