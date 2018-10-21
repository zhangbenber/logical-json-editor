import * as React from 'react';
import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';
// import { shallowEqual } from 'src/utils';

interface NodeProps {
  id: number;
  node: I.Node;
  mouseMovment: I.MouseMovment;
  onSelect?: (id: number, preserve: boolean) => void;
  onStartMouseMovment?: (type: I.MouseMovmentType, data?: any, stopPropagation?: boolean) => void;
  onUpdateMouseMovementData?: (data?: any) => void;
}

export default class Node extends React.Component<NodeProps> {

  constructor(props: any) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  public render() {
    const { node, mouseMovment } = this.props;
    const { width, ports, selected, collapsed } = node;
    const height = collapsed ? 1 : (ports.length + 1);
    const offset = (selected && mouseMovment.type === I.MouseMovmentType.MOVE_NODE)
      ? [mouseMovment.x - mouseMovment.startX, mouseMovment.y - mouseMovment.startY]
      : [0, 0]
    const portElements = (collapsed ? [] : ports).map((port, i) => this.renderPortItem(port, i));
    if (node.type === I.NodeType.OUTPUT) {
      portElements.push(this.renderPortDot(node.ports[0], .4, .5));
    } else if (node.type === I.NodeType.INPUT) {
      portElements.push(this.renderPortDot(node.ports[0], width - .4, .5));
    }
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

        {portElements.map(element => element.back)}

        <rect
          x="-.2" y="-.2" rx=".25" ry=".25" width={node.width + .4} height={height + .4}
          className={styles.indicator}
          onMouseDown={this.handleMouseDown}
        />

        {portElements.map(element => element.front)}

      </g>
    );
  }

  public shouldComponentUpdate(nextProps: NodeProps) {
    const { props } = this;
    if (
      (nextProps.node !== props.node) ||
      (nextProps.mouseMovment !== props.mouseMovment && (
        (props.mouseMovment.type === I.MouseMovmentType.MOVE_NODE ||
        nextProps.mouseMovment.type === I.MouseMovmentType.MOVE_NODE) &&
          nextProps.node.selected
      ))
    ) {
      return true;
    }
    return false;
  }

  private renderPortItem(port: I.Port, i: number) {
    const { width } = this.props.node;
    const dir = {
      [I.PortDirection.IN]: 0,
      [I.PortDirection.OUT]: 1,
    }[port.direction];
    const dot = this.renderPortDot(port, [.4, width - .4][dir], i + 1.55);
    return {
      back: <g key={port.name} transform={`translate(0,${i + 1.05})`}>
        <text
          x={[.8, width - .8][dir]}
          y=".7"
          className={classnames(
            styles.portText,
            [styles.inPort, styles.outPort][dir],
          )}
        >{port.name}</text>
        {dot.back}
        <rect x=".1" y="0" width={width - .2} height=".01" className={styles.split} />
      </g>,
      front: dot.front
    };
  }

  private renderPortDot(port: I.Port, x: number, y: number) {
    const connectable = port.direction === I.PortDirection.OUT || (
      port.constant === undefined &&
      !port.linkIds.length
    );
    return {
      back: <circle
        cx={x} cy=".5" r=".15"
        className={classnames(
          styles.port,
          {
            [styles.inPort]: port.direction === I.PortDirection.IN,
            [styles.outPort]: port.direction === I.PortDirection.OUT,
            [styles.connected]: !!port.linkIds.length,
            [styles.constant]: port.constant !== undefined,
          }
        )}
      />,
      front: connectable ? <g
        className={classnames(styles.portIndicator)}
        onMouseDown={this.handlePortMouseDown.bind(this, port)}
        onMouseEnter={this.handlePortMouseEnter.bind(this, port)}
        onMouseLeave={this.handlePortMouseLeave.bind(this, port)}
      >
        <rect x={x - .4} y={y - .4} width=".8" height=".8" />
        <circle cx={x} cy={y} r=".21" />
      </g> : <g className={classnames(styles.portIndicator)}>
        <rect x={x - .4} y={y - .4} width=".8" height=".8" />
      </g>
    };
  }

  private handleMouseDown: React.MouseEventHandler = e => {
    if (!this.props.node.selected && this.props.onSelect) {
      this.props.onSelect(this.props.id, e.ctrlKey || e.shiftKey || e.metaKey);
    }
    if (this.props.onStartMouseMovment) {
      this.props.onStartMouseMovment(I.MouseMovmentType.MOVE_NODE);
    }
  }

  private handlePortMouseDown(port: I.Port, e: React.MouseEvent) {
    const ref: I.PortRef = {
      nodeId: this.props.node.id,
      portName: port.name,
    };
    if (this.props.onStartMouseMovment) {
      this.props.onStartMouseMovment(I.MouseMovmentType.CREATE_LINK, {
        from: ref,
        to: ref,
        startDirection: port.direction,
        pending: true
      }, true);
    }
  }

  private handlePortMouseEnter(port: I.Port, e: React.MouseEvent) {
    const { mouseMovment } = this.props;
    if (mouseMovment.type === I.MouseMovmentType.CREATE_LINK) {
      const { data } = mouseMovment;
      if (data.startDirection !== port.direction) {
        const ref: I.PortRef = {
          nodeId: this.props.node.id,
          portName: port.name,
        };
        const newData = { ...data, pending: false };
        if (data.startDirection === I.PortDirection.IN) {
          newData.from = ref;
        } else {
          newData.to = ref;
        }
        if (this.props.onUpdateMouseMovementData) {
          this.props.onUpdateMouseMovementData(newData);
        }
      }
    }
  }

  private handlePortMouseLeave(port: I.Port, e: React.MouseEvent) {
    const { mouseMovment } = this.props;
    if (mouseMovment.type === I.MouseMovmentType.CREATE_LINK) {
      const { data } = mouseMovment;
      if (this.props.onUpdateMouseMovementData) {
        this.props.onUpdateMouseMovementData({ ...data, pending: true });
      }
    }
  }
}