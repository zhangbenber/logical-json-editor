import * as I from './typings';

let nextLinkId = 0;

function getDefaultPorts(meta: I.NodeMeta) {
  const groups = meta.portGroups;
  const result: I.Port[] = [];
  groups.forEach(group => {
    (group.extendable ? Array(group.defaultPairs || 1).fill(undefined) : [undefined]).forEach((_, i) => {
      group.ports.forEach(port => {
        result.push({
          name: group.extendable ? `${port.name}.${i + 1}` : port.name,
          direction: port.direction,
          linkIds: [],
        });
      });
    });
  })
  return result;
}

export function createNode(graph: I.Graph, meta: I.NodeMeta, x?: number, y?: number) {
  const isIONode: boolean = meta.type === I.NodeType.INPUT || meta.type === I.NodeType.OUTPUT;
  const id = graph.nodes.length;
  const node: I.Node = {
    id,
    type: meta.type,
    name: meta.name,
    x: x || 0,
    y: y || 0,
    width: 5,
    collapsed: isIONode,
    selected: false,
    ports: [],
    portMap: {}
  };
  graph.nodes.push(node);
  if (isIONode) {
    setPorts(node, [{
      name: meta.type === I.NodeType.INPUT ? 'out' : 'in',
      direction: meta.type === I.NodeType.INPUT ? I.PortDirection.OUT : I.PortDirection.IN,
      linkIds: [],
    }]);
  } else {
    setPorts(node, getDefaultPorts(meta));
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
  const fromNode = graph.nodes[from.nodeId];
  const toNode = graph.nodes[to.nodeId];
  if (fromNode && toNode) {
    const id = nextLinkId++;
    const link: I.Link = {
      id,
      from,
      to,
      selected: false
    };
    graph.links.push(link);
    fromNode.ports[fromNode.portMap[from.portName]].linkIds.push(id);
    toNode.ports[toNode.portMap[to.portName]].linkIds.push(id);
    return id;
  } else {
    return null;
  }
}

export function removeLink(graph: I.Graph, id: number) {
  graph.links.splice(id, 1);
}