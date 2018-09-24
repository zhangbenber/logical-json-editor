import * as React from 'react';
import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

export default class Node extends React.PureComponent<{
  link: I.Link
}> {
  public render() {
    const { link } = this.props;
    const { from, to } = link;
    const fromNode = from.node;
    const toNode = to.node;
    const fromIndex = fromNode.collapsed ? -1.05 : fromNode.ports.indexOf(from);
    const toIndex = toNode.collapsed ? -1.05 : toNode.ports.indexOf(to);

    const x1 = fromNode.x + fromNode.width + .07;
    const y1 = fromNode.y + fromIndex + 1.5 + .05;
    const x2 = toNode.x - .07;
    const y2 = toNode.y + toIndex + 1.5 + .05;
    
    const path = `M${x1 - .3} ${y1}h.3C${x1 + Math.abs(x2 - x1) / 2 + 1} ${y1} ${x2 - Math.abs(x2 - x1) / 2 - 1} ${y2} ${x2} ${y2}h.3`
    return (
      <g className={styles.box}>
        <path d={path} className={styles.indicator} />
        <path d={path} className={classnames(styles.link)} />
      </g>
    )
  }
}