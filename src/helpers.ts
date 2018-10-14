import * as I from './typings';

let nextLinkId = 0;

function getDefaultPorts(name: string) {
  return [
    { name: 'in', direction: I.PortDirection.IN },
    { name: 'out', direction: I.PortDirection.OUT }
  ]
}

export function createNode(graph: I.Graph, type: I.NodeType, name: string) {
  const isIONode: boolean = type === I.NodeType.INPUT || type === I.NodeType.OUTPUT;
  const node: I.Node = {
    type,
    name,
    x: 0,
    y: 0,
    width: 6,
    collapsed: isIONode,
    selected: false,
    ports: [],
    portMap: {}
  };
  graph.nodes.push(node);
  const id = graph.nodes.length - 1;
  if (isIONode) {
    setPorts(node, [{
      name: type === I.NodeType.INPUT ? 'out' : 'in',
      direction: type === I.NodeType.INPUT ? I.PortDirection.OUT : I.PortDirection.IN
    }]);
  } else {
    setPorts(node, getDefaultPorts(name));
  }
  return id;
}

export function removeNode(graph: I.Graph, id: number) {
  graph.nodes[id] = undefined;
}

export function setPorts(node: I.Node, ports: I.Port[]) {
  const map = {};
  ports.forEach(({ name }, i) => {
    map[name] = i;
  });
  node.ports = ports;
  node.portMap = map;
}

export function moveNode(node: I.Node, x: number, y?: number, width?: number) {
  node.x = x;
  if (y !== undefined) { node.y = y; }
  if (width !== undefined) { node.width = width; }
}

export function createLink(graph: I.Graph, from: I.PortRef, to: I.PortRef) {
  const id = nextLinkId++;
  const link: I.Link = {
    id,
    from,
    to,
    selected: false
  };
  graph.links.push(link);
  return id;
}

export function removeLink(graph: I.Graph, id: number) {
  graph.links.splice(id, 1);
}