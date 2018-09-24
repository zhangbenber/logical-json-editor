import * as React from 'react';
import * as I from './typings';

import GraphView from './components/Graph';
import Graph from './models/Graph';

import InputNode from './models/InputNode';
import LogicalNode from './models/LogicalNode';
import OutputNode from './models/OutputNode';

import Link from './models/Link';

const graph = new Graph();

const input = graph.addNode(new InputNode('input')) as InputNode;
const output = graph.addNode(new OutputNode('output')) as OutputNode;
const logical = graph.addNode(new LogicalNode('logical')) as LogicalNode;

input.moveTo(8, 4, 4);
output.moveTo(12, 8, 5);
logical.moveTo(3, 7);

graph.addLink(new Link(input.getPort(), logical.ports[0]));
graph.addLink(new Link(logical.ports[1], output.getPort()));

console.log(graph)

const dimension: I.Dimension = {
  oX: 0,
  oY: 0,
  scale: 25,
}

class App extends React.Component {
  public render() {
    return (
      <GraphView
        graph={graph}
        dimension={dimension}
        className="app"
      />
    );
  }
}

export default App;
