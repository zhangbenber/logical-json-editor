import * as React from 'react';
import * as I from '../../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

export default class LibraryGroup extends React.PureComponent<{
  title: string;
  items: I.NodeMeta[];
  onSelectedNode?: (node: I.NodeMeta | null) => void;
}, { expanded: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      expanded: true
    };
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  
  public render() {
    if (!this.props.items.length) {
      return null;
    }
    return <div className={classnames(
      styles.group,
      { [styles.expanded]: this.state.expanded }
    )}>
      <p
        className={styles.title}
        onClick={this.toggleExpanded}
        tabIndex={0}
      >{this.props.title}</p>
      <div className={styles.content}>
        {this.props.items.map((item, i) => <div
          key={i}
          className={styles.item}
          tabIndex={0}
          draggable={true}
          onFocus={() => this.handleSelect(item)}
          onBlur={() => this.handleSelect(null)}
          onDragStart={(e) => this.handleDragStart(e, item)}
        >{item.name}</div>)}
      </div>
    </div>
  }

  private toggleExpanded() {
    this.setState({ expanded: !this.state.expanded });
  }

  private handleSelect(node: I.NodeMeta | null) {
    if (this.props.onSelectedNode) {
      this.props.onSelectedNode(node);
    }
  }

  private handleDragStart(e: React.DragEvent, node: I.NodeMeta) {
    e.dataTransfer.setData('application/x-logical-json-node-meta', JSON.stringify(node));
  }

}