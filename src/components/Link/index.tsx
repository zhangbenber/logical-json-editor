import * as React from 'react';
import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

export default class Node extends React.PureComponent<{
  link: I.Link,
  fromNode: I.Node,
  toNode: I.Node,
  onSelect?: (id: number, preserve: boolean) => void;
}> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  public render() {
    const { link, fromNode, toNode } = this.props;
    const { from, to } = link;
    const fromIndex = fromNode.collapsed ? -1.05 : fromNode.portMap[from.portName];
    const toIndex = toNode.collapsed ? -1.05 : toNode.portMap[to.portName];

    const x1 = fromNode.x + fromNode.width + .07;
    const y1 = fromNode.y + fromIndex + 1.5 + .05;
    const x2 = toNode.x - .07;
    const y2 = toNode.y + toIndex + 1.5 + .05;
    
    const path = `M${x1 - .3} ${y1}h.3C${x1 + Math.abs(x2 - x1) / 2 + 1} ${y1} ${x2 - Math.abs(x2 - x1) / 2 - 1} ${y2} ${x2} ${y2}h.3`
    return (
      <g
        className={styles.box}
        onMouseDown={this.handleClick}
      >
        <path d={path} className={styles.indicator} />
        <path d={path} className={classnames(styles.link)} />
      </g>
    )
  }

  private handleClick: React.MouseEventHandler = e => {
    e.stopPropagation();
    if (this.props.onSelect) {
      this.props.onSelect(this.props.link.id, e.ctrlKey || e.shiftKey || e.metaKey);
    }
  }
}