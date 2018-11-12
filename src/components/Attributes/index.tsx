import * as React from 'react';
import nodeMeta from '../../meta';
import * as I from '../../typings';

import produce from 'immer';
import classnames from 'classnames';
import * as styles from './style.css';

import Palette from '../Palette';
import Port from './Port';

export default class Attributes extends React.PureComponent<{
  graph: I.Graph;
  className?: any;
  onEdit?: (reducer: ((oldState: I.Graph) => I.Graph)) => void;
}, {
  ioNameInput?: string;
}> {
  constructor(props: any) {
    super(props);
    this.handleIONameCommit = this.handleIONameCommit.bind(this);
    this.state = {
      ioNameInput: undefined as (string | undefined)
    };
  }
  
  public render() {
    const selectedNodes = this.props.graph.nodes.filter(node => !!node && node.selected) as I.Node[];
    return <div className={classnames(styles.box, this.props.className || '')}>
      <Palette title="节点属性">
        {this.renderPanel(selectedNodes)}
      </Palette>
    </div>
  }

  private renderPanel(selectedNodes: I.Node[]) {
    if (selectedNodes.length === 0) {
      return <div className={styles.desc}><p><em>选中一个节点以查看节点属性。</em></p></div>
    } else if (selectedNodes.length > 1) {
      return <div className={styles.desc}>选中了 {selectedNodes.length} 个节点。</div>
    } else {
      const node = selectedNodes[0];
      let meta: I.NodeMeta = {} as I.NodeMeta;
      let name = node.name;
      if (node.type === I.NodeType.INPUT) {
        name = 'input';
      } else if (node.type === I.NodeType.OUTPUT) {
        name = 'output';
      }
      nodeMeta.find(category => {
        const foundNode: I.NodeMeta | undefined = category.nodes.find(node2 => node2.name === name);
        if (foundNode) {
          meta = foundNode;
          return true;
        } else {
          return false;
        }
      });
      if (meta) {
        return <div className={styles.scroll}>
          <div className={styles.desc}>
            <p><strong>{meta.name} : </strong>{meta.label}</p>
            <p>{meta.desc}</p>
          </div>
          {node.type !== I.NodeType.LOGICAL ?
            <div className={styles.ioName}>
              <span>端口名称</span>
              <input
                type="text"
                value={this.state.ioNameInput !== undefined ? this.state.ioNameInput : selectedNodes[0].name}
                onChange={this.handleIONameChange}
                onKeyDown={this.handleIONameKeyDown}
                onBlur={this.handleIONameCommit}
              />
            </div>
          : null}
          {this.renderPorts(node, meta)}
        </div>
      }
    }
    return '未知节点。';
  }

  private handleIONameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({
      ioNameInput: e.currentTarget.value
    });
  }

  private handleIONameCommit() {
    if (this.props.onEdit) {
      this.props.onEdit(state => produce(state, oldState => {
        const selectedNodes = oldState.nodes.filter(node => !!node && node.selected) as I.Node[];
        if (selectedNodes[0] && this.state.ioNameInput) {
          selectedNodes[0].name = this.state.ioNameInput;
        }
      }));
    }
    console.log(this.state.ioNameInput);
    this.setState({
      ioNameInput: undefined
    });
  }

  private handleIONameKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.setState({
        ioNameInput: e.currentTarget.value
      });
      e.currentTarget.blur();
    }
  }
  
  private renderPorts(node: I.Node, meta: I.NodeMeta) {
    console.log(node, meta);
    return meta.portGroups.map((group, i) => <div
      className={styles.group}
      key={i}
    >
      {(group.extendable ? Array(group.defaultPairs || 1).fill(null) : [null]).map((_, j) =>
        <div key={j} className={classnames(styles.groupItem, { [styles.extendable]: group.extendable })}>
          {group.extendable ? <div className={styles.action}>
            #{j + 1}
            <div className={styles.actionBar}>
              <div>+</div>
              <div>x</div>
            </div>
          </div> : null}
          {group.ports.map(portMeta => {
            const port = node.ports[node.portMap[`${portMeta.name}${group.extendable ? `.${j + 1}` : ''}`]];
            return <Port
              meta={portMeta}
              port={port}
              key={port.name}
              onChangeConstant={this.handlePortConstantChange.bind(this, node.id, port.name)}
            />
          })}
        </div>
      )}
    </div>)
  }

  private handlePortConstantChange(
    nodeId: number,
    portName: string,
    constant: any,
    constantInput?: any,
    constantError?: boolean
  ) {
    console.log(constant)
    if (this.props.onEdit) {
      this.props.onEdit(state => produce(state, oldState => {
        const node = oldState.nodes[nodeId];
        if (node) {
          const port = node.ports[node.portMap[portName]];
          if (port) {
            port.constant = constant;
            port.constantInput = constantInput;
            port.constantError = constantError;
          }
        }
      }));
    }
  }

}