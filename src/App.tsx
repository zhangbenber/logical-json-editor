import * as React from 'react';
import * as I from './typings';

import Graph from './components/Graph';

const graph: I.Graph = {
  nodes: [
    {
      id: 0,
      name: 'in',
      type: I.NodeType.INPUT,
      x: 5,
      y: 5,
      width: 4,
    },
    {
      id: 1,
      name: 'logic',
      type: I.NodeType.LOGICAL,
      inputs: [{
        name: 'input 1',
        direction: I.PortDirection.IN,
      }, {
        name: 'input 2',
        direction: I.PortDirection.IN,
      }],
      outputs: [{
        name: 'output',
        direction: I.PortDirection.OUT,
      }],
      x: 6,
      y: 10,
      width: 5,
    },
    {
      id: 2,
      name: 'out 中文',
      type: I.NodeType.OUTPUT,
      x: 13,
      y: 11,
      width: 4,
    },
  ],
  links: [],
}

const dimension: I.Dimension = {
  oX: 0,
  oY: 0,
  scale: 25,
}

class App extends React.Component {
  public render() {
    return (
      <Graph
        graph={graph}
        dimension={dimension}
        className="app"
      />
    );
  }
}

export default App;
