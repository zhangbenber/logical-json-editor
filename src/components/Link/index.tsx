import * as React from 'react';
import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

export default class Node extends React.PureComponent<{
  link: I.Link,
  nodes: Array<I.Node | undefined>,
  mouseMovment: I.MouseMovment;
  isShadow?: boolean;
  onSelect?: (id: number, preserve: boolean) => void;
  onStartMouseMovment?: (type: I.MouseMovmentType, data?: any, stopPropagation?: boolean) => void;
}> {
  constructor(props: any) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }
  
  public render() {
    const { link, nodes, mouseMovment, isShadow } = this.props;
    
    const { from, to } = link;
    const fromNode = nodes[from.nodeId]!;
    const toNode = nodes[to.nodeId]!;
    const fromIndex = fromNode.collapsed ? -1.05 : fromNode.portMap[from.portName];
    const toIndex = toNode.collapsed ? -1.05 : toNode.portMap[to.portName];

    let x1 = fromNode.x + fromNode.width + .07;
    let y1 = fromNode.y + fromIndex + 1.5 + .05;
    let x2 = toNode.x - .07;
    let y2 = toNode.y + toIndex + 1.5 + .05;

    if (mouseMovment.type === I.MouseMovmentType.MOVE_NODE) {
      if (fromNode.selected) {
        x1 += mouseMovment.x - mouseMovment.startX;
        y1 += mouseMovment.y - mouseMovment.startY;
      }
      if (toNode.selected) {
        x2 += mouseMovment.x - mouseMovment.startX;
        y2 += mouseMovment.y - mouseMovment.startY;
      }
    }

    if (isShadow && mouseMovment.type === I.MouseMovmentType.CREATE_LINK) {
      const { data, x, y } = mouseMovment;
      if (data.pending) {
        if (data.startDirection === I.PortDirection.IN) {
          x1 = x + .3; y1 = y;
        } else {
          x2 = x - .3; y2 = y;
        }
      }
    }
    
    const path = `M${x1 - .3} ${y1}h.3C${x1 + Math.abs(x2 - x1) / 2 + 1} ${y1} ${x2 - Math.abs(x2 - x1) / 2 - 1} ${y2} ${x2} ${y2}h.3`
    return (
      <g
        className={classnames(styles.box, {
          [styles.shadow]: isShadow && mouseMovment.data.pending,
          [styles.ghost]: isShadow
        })}
        onMouseDown={this.handleMouseDown}
      >
        <path d={path} className={styles.indicator} />
        <path d={path} className={classnames(styles.link)} />
      </g>
    )
  }

  private handleMouseDown: React.MouseEventHandler = e => {
    if (!this.props.link.selected && this.props.onSelect) {
      this.props.onSelect(this.props.link.id, e.ctrlKey || e.shiftKey || e.metaKey);
    }
  }
}