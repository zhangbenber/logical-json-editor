import * as React from 'react';

import classnames from 'classnames';
// import * as helpers from '../../helpers';
import * as I from '../../typings';

import * as styles from './style.css';

import Palette from '../Palette';
import Attributes from '../Attributes';
import Graph from '../Graph';
import Library from '../Library';
import ToolBar from '../ToolBar';
import Dialog from '../Dialog';

import nodeMeta from 'src/meta';

class App extends React.PureComponent<{
  className?: any;
}> {
  public state = {
    graph: {
      nodes: [],
      links: [],
    } as I.Graph,
    dimension: {
      oX: 0,
      oY: 0,
      scale: 25,
      width: 0,
      height: 0,
    } as I.Dimension,
  }

  private graph: Graph | null;

  private toolBarActions: { [type: string]: () => void } = {
    code: () => {
      const { graph } = this.state;
      const nodes = graph.nodes.filter(n => {
        if (!n) {
          return false;
        }
        return n.ports.some(p => !!p.linkIds.length);
      }) as I.Node[];
      const links = graph.links.filter(l => !!l) as I.Link[];
      const nodeIds: { [id: number]: number } = {};
      function mapPortRef(ref: I.PortRef): I.LogicalJSONPort {
        const node = graph.nodes[ref.nodeId] as I.Node;
        const id = nodeIds[node.id];
        if (node.type !== I.NodeType.LOGICAL) {
          return id;
        } else {
          return [id, ref.portName];
        }
      }
      nodes.forEach((n, i) => {
        nodeIds[n.id] = i;
      });
      const result: I.LogicalJSON = {
        i: [],
        o: [],
        n: [],
        l: links.map(l => [mapPortRef(l.from), mapPortRef(l.to)] as [I.LogicalJSONPort, I.LogicalJSONPort])
      };
      nodes.forEach(n => {
        const id = nodeIds[n.id];
        switch (n.type) {
          case I.NodeType.INPUT:
            result.i.push([id, n.name]);
            break;
          case I.NodeType.OUTPUT:
            result.o.push([id, n.name]);
            break;
          default:
            const constant = {};
            let hasConstant = false;
            n.ports.forEach(p => {
              if (p.constant !== undefined) {
                constant[p.name] = p.constant;
                hasConstant = true;
              }
            });
            result.n.push(hasConstant ? [id, n.name, constant] : [id, n.name]);
        }
      });
      Dialog.show({
        title: '导出 LogicalJSON',
        width: 500,
        height: 200,
        children: <div>
          <textarea
            className={styles.dialogExportTextarea}
            value={JSON.stringify(result)}
            // readOnly
            tabIndex={0}
          />
        </div>,
        padding: '9px 8px 10px',
        buttons: [
          { text: '复制', primary: true, close: true },
          { text: '关闭', close: true },
        ]
      });
    }
  }

  constructor(props: any) {
    super(props);
    this.graphMounted = this.graphMounted.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleToolBarButtonClick = this.handleToolBarButtonClick.bind(this);
    this.handleUpdateDimension = this.handleUpdateDimension.bind(this);

    const graph: I.Graph = {
      nodes: [],
      links: [],
    };

    // const input = helpers.createNode(graph, nodeMeta[0].nodes[0], 2, 3);
    // const output = helpers.createNode(graph, nodeMeta[0].nodes[1], 20, 5);
    // const logical = helpers.createNode(graph, nodeMeta[1].nodes[1], 10, 8);

    // helpers.createLink(
    //   graph,
    //   { nodeId: input, portName: 'out' },
    //   { nodeId: logical, portName: 'in.1' }
    // );

    // helpers.createLink(
    //   graph,
    //   { nodeId: logical, portName: 'out' },
    //   { nodeId: output, portName: 'in' }
    // );

    // (graph.nodes[logical] as I.Node).ports[1].constant = 'test';
    // (graph.nodes[logical] as I.Node).ports[1].constantInput = '"test"';

    // console.log(graph)

    this.state.graph = graph;
  }

  public render() {
    return (
      <div
        className={classnames(styles.editor, this.props.className || '')}
        onBlur={this.handleBlur}
      >
        {/* <Dialog title="test" buttons={[{text: "123"}]}/> */}
        <Dialog.Hub />
        <ToolBar className={styles.toolbar} onButtonClick={this.handleToolBarButtonClick} />
        <div className={styles.workspace}>
          <Library
            className={styles.library}
            items={nodeMeta}
          />
          <div className={styles.graph}>
            <div className={styles.graphTitle}>
              <Palette tabs={['文档 1', '文档 2', '文档 3']}>
                <Graph
                  className={styles.graphBox}
                  graph={this.state.graph}
                  onEdit={this.handleEdit}
                  dimension={this.state.dimension}
                  onUpdateDimension={this.handleUpdateDimension}
                  ref={this.graphMounted}
                />
              </Palette>
            </div>
            <div className={styles.graphDebugger}>
              <Palette title="调试" />
            </div>
          </div>
          <Attributes
            className={styles.attributes}
            graph={this.state.graph}
            onEdit={this.handleEdit}
          />
        </div>
      </div>
    );
  }

  private handleBlur() {
    window.setTimeout(() => {
      console.log(document.activeElement)
      if (!document.activeElement || document.activeElement === document.body) {
        this.focusOnGraph();
      }
    }, 0);
  }

  private focusOnGraph() {
    const graphBox = this.graph && this.graph.getBox();
    if (graphBox) {
      graphBox.focus();
    }
  }

  private handleEdit(reducer: ((oldState: I.Graph) => I.Graph)) {
    this.setState({
      graph: reducer(this.state.graph)
    });
    this.focusOnGraph();
  }

  private handleUpdateDimension(dimension: I.Dimension) {
    this.setState({ dimension });
  }

  private graphMounted(ref: Graph | null) {
    this.graph = ref;
  }

  private handleToolBarButtonClick(type: string) {
    if (this.graph) {
      this.graph.onButtonClick(type);
    }
    if (this.toolBarActions[type]) {
      this.toolBarActions[type]();
    }
  }

}

export default App;
