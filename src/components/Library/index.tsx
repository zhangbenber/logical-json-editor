import * as React from 'react';
import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

import Palette from '../Palette';
import Group from './Group';

export default class Library extends React.PureComponent<{
  items: I.NodeCategoryMeta[];
  className?: any;
}, {
  selectedNode: I.NodeMeta | null;
}> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedNode: null 
    };
    this.handleSelectNode = this.handleSelectNode.bind(this);
  }
  
  public render() {
    return <div className={classnames(styles.box, this.props.className || '')}>
      <Palette title="逻辑节点库">
        <div className={styles.search}>
          <span>搜索: </span>
          <input className={styles.searchInput} type="text" />
        </div>
        <div className={styles.content}>
          {this.props.items.map((category, i) =>
            <Group
              title={category.category}
              items={category.nodes}
              onSelectNode={this.handleSelectNode}
              key={i}
            />
          )}
        </div>
        <div className={styles.desc}>
          {this.renderDesc()}
          
        </div>
      </Palette>
    </div>
  }

  private handleSelectNode(node: I.NodeMeta) {
    this.setState({
      selectedNode: node
    });
  }

  private renderDesc() {
    const { selectedNode } = this.state;
    if (!selectedNode) {
      return <p><em>在上方选择一个节点类别，可以查看其详细说明。</em></p>
    }
    return <div>
      <p><strong>{selectedNode.name}</strong></p>
      <p>{selectedNode.desc}</p>
      <hr />
      {selectedNode.portGroups.map((group, i) =>
         group.ports.map((port, j) =>
          <p key={`${port.direction}${port.name}`}>
            <strong>{port.direction === I.PortDirection.IN ? '>' : '<'} {port.name}{group.extendable ? '[]' : ''} : </strong>{port.desc}
          </p> 
         )
      )}
    </div>
  }

}