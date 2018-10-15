import * as React from 'react';
import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

import Link from '../Link';
import Node from '../Node';

import produce from 'immer';
import reducersOf from '../../reducers';

import * as helpers from 'src/helpers';

const nullMouseMovment: I.MouseMovment = {
  type: I.MouseMovmentType.NONE,
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
}

export default class Graph extends React.PureComponent<{
  graph: I.Graph,
  dimension: I.Dimension,
  className?: any,
  onEdit?: (reducer: ((oldState: I.Graph) => I.Graph)) => void;
}, {
  width: number,
  height: number,
  mouseMovment: I.MouseMovment
}> {
  public state = {
    width: 0,
    height: 0,
    mouseMovment: nullMouseMovment
  }

  private box: HTMLDivElement | null = null;
  private nextMouseMovment: I.MouseMovmentType = I.MouseMovmentType.NONE;

  constructor(props: any) {
    super(props);
    this.handleSelectNode = this.handleSelectNode.bind(this);
    this.handleDeselectAll = this.handleDeselectAll.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleStartMouseMovment = this.handleStartMouseMovment.bind(this);
  }

  public render() {
    const { nodes, links } = this.props.graph;
    return (
      <div
        className={classnames(this.props.className, styles.box)}
        ref={r => this.calcSize(r)}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <svg
          className={styles.view}
          width={this.state.width}
          height={this.state.height}
          viewBox={this.calcViewBox()}
        >
          {this.renderDefs()}
          <rect
            x="-100"
            y="-100"
            width="200"
            height="200"
            fill="url(#grid)"
            onMouseDown={this.handleDeselectAll}
          />
          {nodes.map((node, id) => 
            node ? <Node
              id={id}
              node={node}
              key={id}
              mouseMovment={this.state.mouseMovment}
              onStartMouseMovment={this.handleStartMouseMovment}
              onSelect={this.handleSelectNode}
            /> : null)
          }
          {links.map((link) =>
            link ? <Link
              link={link}
              key={link.id}
              fromNode={nodes[link.from.nodeId] as I.Node}
              toNode={nodes[link.to.nodeId] as I.Node}
              mouseMovment={this.state.mouseMovment}
              onStartMouseMovment={this.handleStartMouseMovment}
            /> : null)
          }
        </svg>
      </div>
    );
  }

  private renderDefs() {
    return <defs>
      <pattern id="grid" width="1" height="1" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="1.1" height="1.1" className={styles.grid} />
      </pattern>
    </defs >
  }

  private calcSize(ele: HTMLDivElement | null) {
    if (ele === this.box) {
      return;
    }
    if (ele !== undefined) {
      this.box = ele;
    }
    if (this.box) {
      this.setState({
        width: this.box.clientWidth,
        height: this.box.clientHeight,
      });
    }
  }

  private calcViewBox() {
    const { dimension } = this.props;
    const { width, height } = this.state;
    return `${
      -dimension.oX / dimension.scale
    } ${
      -dimension.oY / dimension.scale
    } ${
      (width - dimension.oX) / dimension.scale
    } ${
      (height - dimension.oY) / dimension.scale
    }`
  }

  private handleDeselectAll() {
    this.apply(state => { reducersOf(state).deselectAll(); })
  }

  private handleSelectNode(id: number, preserve: boolean) {
    this.apply(state => { reducersOf(state).selectNode(id, preserve); })
  }

  private getMouseCords(e: React.MouseEvent) {
    if (!this.box) {
      return { x: 0, y: 0 };
    }
    const { dimension } = this.props;
    const boundary = this.box.getBoundingClientRect();
    return {
      x: (e.clientX - boundary.left - dimension.oX) / dimension.scale,
      y: (e.clientY - boundary.top - dimension.oY) / dimension.scale,
    }
  }

  private handleMouseDown: React.MouseEventHandler = e => {
    const cords = this.getMouseCords(e);
    this.setState({
      mouseMovment: Object.assign({
        type: this.nextMouseMovment,
        startX: cords.x,
        startY: cords.y,
      }, cords)
    });
  }

  private handleMouseMove: React.MouseEventHandler = e => {
    const cords = this.getMouseCords(e);
    this.setState({
      mouseMovment: Object.assign({}, this.state.mouseMovment, cords)
    });
  }

  private handleMouseUp: React.MouseEventHandler = e => {
    const { mouseMovment } = this.state;
    switch (mouseMovment.type) {
      case I.MouseMovmentType.DRAG_NODE:
        this.apply(state => {
          state.nodes.forEach(node => {
            if (node && node.selected) {
              node.x = Math.round(node.x + mouseMovment.x - mouseMovment.startX);
              node.y = Math.round(node.y + mouseMovment.y - mouseMovment.startY);
            }
          })
        });
        break;
    }
    this.setState({
      mouseMovment: nullMouseMovment
    });
  }

  private handleDragOver: React.DragEventHandler = e => {
    e.dataTransfer.dropEffect = 'copy';
    if (e.dataTransfer.types.indexOf('application/x-logical-json-node-meta') > -1) {
      e.preventDefault();
    }
  }

  private handleDrop: React.DragEventHandler = e => {
    const data = JSON.parse(e.dataTransfer.getData('application/x-logical-json-node-meta'));
    const cords = this.getMouseCords(e);
    this.apply(state => {
      const id = helpers.createNode(state, data, Math.round(cords.x - 2.5), Math.round(cords.y - .5));
      reducersOf(state).selectNode(id, false);
    });
  }

  private handleStartMouseMovment(type: I.MouseMovmentType) {
    this.nextMouseMovment = type;
  }

  private apply(producer: (oldState: I.Graph) => any) {
    if (this.props.onEdit) {
      this.props.onEdit((oldState => {
        return produce(oldState, producer)
      }));
    }
  }

}