import * as I from './typings';

class ReducerFactory {
  constructor(private state: I.Graph) { }
  
  public deselectAll() {
    this.state.links.forEach(link => {
      if (link) {
        link.selected = false;
      }
    });
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

  public selectLink(id: number, preserve: boolean) {
    if (!preserve) {
      this.deselectAll();
    }
    const link = this.state.links[id];
    if (link) {
      link.selected = true;
    }
  }

  public deleteLink(id: number) {
    const { links } = this.state;
    const link = links[id];
    if (link) {
      [link.from, link.to].forEach(portRef => {
        const node = this.state.nodes[portRef.nodeId];
        if (node) {
          const port = node.ports[node.portMap[portRef.portName]];
          if (port) {
            const index = port.linkIds.indexOf(id);
            if (index > -1) {
              port.linkIds.splice(index, 1);
            }
          }
        }
      });
    }
    links[id] = undefined;
  }

  public deleteNode(id: number) {
    const { nodes } = this.state;
    const node = nodes[id];
    if (node) {
      node.ports.forEach(port => {
        port.linkIds.forEach(connectedLinkId => {
          this.deleteLink(connectedLinkId);
        });
      });
      nodes[id] = undefined;
    }
  }

  public deleteSelected() {
    this.state.nodes.forEach((node, id) => {
      if (node && node.selected) {
        this.deleteNode(id);
      }
    });
    this.state.links.forEach((link, id) => {
      if (link && link.selected) {
        this.deleteLink(id);
      }
    });
  }

}

export default (state: I.Graph) => new ReducerFactory(state);