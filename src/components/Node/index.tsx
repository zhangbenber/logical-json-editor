import * as React from 'react';
import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

export default class Node extends React.PureComponent<{
  node: I.Node
}> {
  public render() {
    const { node } = this.props;
    const { width } = node;
    const ports = [...node.inputs || [], ...node.outputs || []];
    const height = ports.length + 1;
    return (
      <g
        transform={`translate(${node.x},${node.y})`}
        className={classnames(
          styles.box,
          {
            [I.NodeType.INPUT]: styles.input,
            [I.NodeType.OUTPUT]: styles.output,
          }[node.type]
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

        {ports.map((port, i) => {
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
          x="-.15" y="-.15" rx=".17" ry=".17" width={node.width + .3} height={height + .3}
          className={styles.indicator}
        />

      </g>
    );
  }
}