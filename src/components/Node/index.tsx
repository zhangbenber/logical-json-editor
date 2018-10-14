import * as React from 'react';
import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

export default class Node extends React.PureComponent<{
  id: number;
  node: I.Node;
  mouseMovment: I.MouseMovment;
  onSelect?: (id: number, preserve: boolean) => void;
  onStartMouseMovment: (type: I.MouseMovmentType) => void;
}> {
  constructor(props: any) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  public render() {
    const { node, mouseMovment } = this.props;
    const { width, ports, selected, collapsed } = node;
    const height = collapsed ? 1 : (ports.length + 1);
    const offset = (selected && mouseMovment.type === I.MouseMovmentType.DRAG_NODE)
      ? [mouseMovment.x - mouseMovment.startX, mouseMovment.y - mouseMovment.startY]
      : [0, 0]
    return (
      <g
        transform={`translate(${node.x + offset[0]},${node.y + offset[1]})`}
        className={classnames(
          styles.box,
          {
            [I.NodeType.INPUT]: styles.input,
            [I.NodeType.OUTPUT]: styles.output,
          }[node.type],
          { [styles.selected]: node.selected }
        )}
      >

        {node.type === I.NodeType.LOGICAL ?
          <rect
            x="-.05" y="-.05" width={width + .1} height={height + .1}
            className={styles.node}
          />
        : null}
        <rect
          x="-.05" y="-.05" width={width + .1} height={1.1}
          className={styles.title}
        />
        <rect
          x="-.1" y="-.1" rx=".15" ry=".15" width={node.width + .2} height={height + .2}
          className={styles.border}
        />

        <text
          x={{
            [I.NodeType.OUTPUT]: .8,
            [I.NodeType.INPUT]: width - .8,
          }[node.type] || width / 2}
          y=".7"
          className={styles.titleText}
        >{node.name}</text>
        {node.type === I.NodeType.OUTPUT ?
          <circle
            cx=".4" cy=".5" r=".15"
            className={classnames(styles.port, styles.inPort)}
          />
        : null}
        {node.type === I.NodeType.INPUT ?
          <circle
            cx={width - .4} cy=".5" r=".15"
            className={classnames(styles.port, styles.outPort)}
          />
        : null}

        {(collapsed ? [] : ports).map((port, i) => {
          const dir = {
            [I.PortDirection.IN]: 0,
            [I.PortDirection.OUT]: 1,
          }[port.direction]
          return (
            <g key={port.name} transform={`translate(0,${i + 1.05})`}>
              <text
                x={[.8, width - .8][dir]}
                y=".7"
                className={classnames(
                  styles.portText,
                  [styles.inPort, styles.outPort][dir],
                )}
              >{port.name}</text>
              <circle
                cx={[.4, width - .4][dir]} cy=".5" r=".15"
                className={classnames(
                  styles.port,
                  [styles.inPort, styles.outPort][dir],
                )}
              />
              <rect x=".1" y="0" width={width - .2} height=".01" className={styles.split} />
            </g>
          )
        })}

        <rect
          x="-.2" y="-.2" rx=".25" ry=".25" width={node.width + .4} height={height + .4}
          className={styles.indicator}
          onMouseDown={this.handleMouseDown}
        />

      </g>
    );
  }

  private handleMouseDown: React.MouseEventHandler = e => {
    if (!this.props.node.selected && this.props.onSelect) {
      this.props.onSelect(this.props.id, e.ctrlKey || e.shiftKey || e.metaKey);
    }
    this.props.onStartMouseMovment(I.MouseMovmentType.DRAG_NODE);
  }
}