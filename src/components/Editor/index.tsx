import * as React from 'react';

import classnames from 'classnames';
import * as helpers from '../../helpers';
import * as I from '../../typings';

import * as styles from './style.css';

import Attributes from '../Attributes';
import Graph from '../Graph';
import Library from '../Library';

import nodeMeta from 'src/meta';

const dimension: I.Dimension = {
  oX: 0,
  oY: 0,
  scale: 25,
}

class App extends React.Component<{
  className?: any;
}> {
  public state = {
    graph: {
      nodes: [],
      links: [],
    } as I.Graph
  }

  constructor(props: any) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);

    const graph: I.Graph = {
      nodes: [],
      links: [],
    };

    const input = helpers.createNode(graph, nodeMeta[0].nodes[0], 2, 3);
    const output = helpers.createNode(graph, nodeMeta[0].nodes[1], 20, 5);
    const logical = helpers.createNode(graph, nodeMeta[1].nodes[1], 10, 8);

    // helpers.moveNode(graph.nodes[input] as I.Node, 8, 4, 4);
    // helpers.moveNode(graph.nodes[output] as I.Node, 12, 8, 5);
    // helpers.moveNode(graph.nodes[logical] as I.Node, 3, 7);

    helpers.createLink(
      graph,
      { nodeId: input, portName: 'out' },
      { nodeId: logical, portName: 'in.1' }
    );

    helpers.createLink(
      graph,
      { nodeId: logical, portName: 'out' },
      { nodeId: output, portName: 'in' }
    );

    (graph.nodes[logical] as I.Node).ports[1].constant = 'test';

    console.log(graph)

    this.state = { graph };
  }

  public render() {
    return (
      <div className={classnames(styles.editor, this.props.className || '')}>
        <Library
          className={styles.library}
          items={nodeMeta}
        />
        <Graph
          graph={this.state.graph}
          onEdit={this.handleEdit}
          dimension={dimension}
          className={styles.graph}
        />
        <Attributes
          className={styles.attributes}
          graph={this.state.graph}
        />
      </div>
    );
  }

  private handleEdit(reducer: ((oldState: I.Graph) => I.Graph)) {
    this.setState({
      graph: reducer(this.state.graph)
    });
  }
}

export default App;
