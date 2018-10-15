import * as React from 'react';
import nodeMeta from '../../meta';
import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

import Palette from '../Palette';
import Port from './Port';

export default class Attributes extends React.PureComponent<{
  graph: I.Graph;
  className?: any;
}> {
  constructor(props: any) {
    super(props);
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
      return <div className={styles.desc}><em>选中一个节点以查看节点属性。</em></div>
    } else if (selectedNodes.length > 1) {
      return <div className={styles.desc}>选中了 {selectedNodes.length} 个节点。</div>
    } else {
      const node = selectedNodes[0];
      let meta: I.NodeMeta = {} as I.NodeMeta;
      nodeMeta.find(category => {
        const foundNode: I.NodeMeta | undefined = category.nodes.find(node2 => node2.name === node.name);
        if (foundNode) {
          meta = foundNode;
          return true;
        } else {
          return false;
        }
      });
      if (meta) {
        return <div>
          <div className={styles.desc}>
            <p><strong>{meta.name} : </strong>{meta.label}</p>
            <p>{meta.desc}</p>
          </div>
          {this.renderPorts(node, meta)}
        </div>
      }
    }
    return '未知节点。';
  }

  private renderPorts(node: I.Node, meta: I.NodeMeta) {
    // node.ports.map(port => div)
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
            />
          })}
        </div>
      )}
    </div>)
  }

}