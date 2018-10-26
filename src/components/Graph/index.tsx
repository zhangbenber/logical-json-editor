import * as React from 'react';
import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

import Link from '../Link';
import Node from '../Node';

import produce from 'immer';
import reducersOf from '../../reducers';

import * as helpers from 'src/helpers';
import NavBar from './NavBar';

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
  onUpdateDimension?: (dimension: I.Dimension) => void;
}, {
  width: number,
  height: number,
  mouseMovment: I.MouseMovment,
  grabbing: boolean;
}> {
  public state = {
    width: 0,
    height: 0,
    mouseMovment: nullMouseMovment,
    grabbing: false,
  }

  private box: HTMLDivElement | null = null;
  private nextMouseMovmentType: I.MouseMovmentType = I.MouseMovmentType.NONE;
  private nextMouseMovmentData?: any;
  private nextMouseMovmentHandleStopped: boolean = false;
  private dimensionChecker?: number;

  constructor(props: any) {
    super(props);
    this.viewMounted = this.viewMounted.bind(this);
    this.handleSelectNode = this.handleSelectNode.bind(this);
    this.handleSelectLink = this.handleSelectLink.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDownOnCanvas = this.handleMouseDownOnCanvas.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleStartMouseMovment = this.handleStartMouseMovment.bind(this);
    this.handleUpdateMouseMovementData = this.handleUpdateMouseMovementData.bind(this);
    this.handleUpdateDimension = this.handleUpdateDimension.bind(this);
  }

  public render() {
    const { mouseMovment } = this.state;
    const { nodes, links } = this.props.graph;
    return (
      <div className={classnames(this.props.className, styles.box)}>
        <div
          className={classnames(styles.view, { [styles.grab]: this.state.grabbing })}
          ref={this.viewMounted}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseUp}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          onDragOver={this.handleDragOver}
          onDrop={this.handleDrop}
          tabIndex={1}
        >
          <svg
            className={styles.svg}
            width={this.state.width}
            height={this.state.height}
            viewBox={this.calcViewBox()}

          >
            {this.renderDefs()}
            <rect
              x={-(this.props.dimension.oX + this.state.width) / this.props.dimension.scale}
              y={-(this.props.dimension.oY + this.state.height) / this.props.dimension.scale}
              width={3 * this.state.width / this.props.dimension.scale}
              height={3 * this.state.height / this.props.dimension.scale}
              fill="url(#grid)"
              onMouseDown={this.handleMouseDownOnCanvas}
            />
            {nodes.map((node, id) => 
              node ? <Node
                id={id}
                node={node}
                key={id}
                mouseMovment={mouseMovment}
                onStartMouseMovment={this.handleStartMouseMovment}
                onUpdateMouseMovementData={this.handleUpdateMouseMovementData}
                onSelect={this.handleSelectNode}
              /> : null)
            }
            {links.map((link) =>
              link ? <Link
                link={link}
                key={link.id}
                nodes={nodes}
                mouseMovment={mouseMovment}
                onStartMouseMovment={this.handleStartMouseMovment}
                onSelect={this.handleSelectLink}
                // onUpdateMouseMovementData={this.handleonUpdateMouseMovementData}
              /> : null)
            }
            {mouseMovment.type === I.MouseMovmentType.CREATE_LINK ? <Link
              link={mouseMovment.data}
              nodes={nodes}
              mouseMovment={mouseMovment}
              isShadow
            /> : null}
          </svg>
        </div>
        <NavBar
          graph={this.props.graph}
          dimension={this.props.dimension}
          onUpdateDimension={this.handleUpdateDimension}
        />
      </div>
    );
  }

  public onButtonClick(type: string) {
    console.log(type);
  }

  public getBox() {
    return this.box;
  }

  private renderDefs() {
    return <defs>
      <pattern id="grid" width="1" height="1" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="1.1" height="1.1" className={styles.grid} />
      </pattern>
    </defs >
  }
  
  private viewMounted(ele: HTMLDivElement | null) {
    this.calcSize(ele);
    if (ele) {
      ele.focus();
    }
  }

  private calcSize(ele?: HTMLDivElement | null) {
    const { dimension } = this.props;
    if (ele === this.box) {
      return;
    }
    if (ele !== undefined) {
      this.box = ele;
    }
    if (this.box) {
      if (!this.dimensionChecker) {
        this.dimensionChecker = window.setInterval(() => {
          this.calcSize();
        }, 200);
      }
      const width = this.box.clientWidth;
      const height = this.box.clientHeight;
      this.setState({
        width, height
      });
      if ((dimension.width !== width || dimension.height !== height) && this.props.onUpdateDimension) {
        this.props.onUpdateDimension({
          ...dimension,
          width, height
        });
      }
    } else {
      if (this.dimensionChecker) {
        clearInterval(this.dimensionChecker)
        this.dimensionChecker = undefined;
      }
    }
  }

  private calcViewBox() {
    const { dimension } = this.props;
    const { width, height, mouseMovment } = this.state;
    let x = dimension.oX;
    let y = dimension.oY;
    if (mouseMovment.type === I.MouseMovmentType.GRAB) {
      x += (mouseMovment.x - mouseMovment.startX) * dimension.scale;
      y += (mouseMovment.y - mouseMovment.startY) * dimension.scale;
    }
    return `${
      -x / dimension.scale
    } ${
      -y / dimension.scale
    } ${
      width / dimension.scale
    } ${
      height / dimension.scale
    }`
  }

  private handleMouseDownOnCanvas: React.MouseEventHandler = (e) => {
    if (e.ctrlKey || e.shiftKey || e.metaKey) {
      return;
    }
    this.apply(state => { reducersOf(state).deselectAll(); })
  }

  private handleSelectNode(id: number, preserve: boolean) {
    this.apply(state => { reducersOf(state).selectNode(id, preserve); })
  }

  private handleSelectLink(id: number, preserve: boolean) {
    this.apply(state => { reducersOf(state).selectLink(id, preserve); })
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
    if (this.state.grabbing) {
      this.handleStartMouseMovment(I.MouseMovmentType.GRAB);
    }
    const cords = this.getMouseCords(e);
    this.setState({
      mouseMovment: Object.assign({
        type: this.nextMouseMovmentType,
        startX: cords.x,
        startY: cords.y,
        data: this.nextMouseMovmentData,
      }, cords)
    });
  }

  private handleMouseMove: React.MouseEventHandler = e => {
    const { mouseMovment } = this.state;
    if (mouseMovment.type !== I.MouseMovmentType.NONE) {
      const cords = this.getMouseCords(e);
      this.setState({
        mouseMovment: Object.assign({}, mouseMovment, cords)
      });
    }
  }

  private handleMouseUp: React.MouseEventHandler = e => {
    const { mouseMovment } = this.state;
    const { data } = mouseMovment;
    switch (mouseMovment.type) {

      case I.MouseMovmentType.GRAB:
        if (this.props.onUpdateDimension) {
          const { dimension } = this.props;
          const { x, y, startX, startY } = mouseMovment;
          const { oX, oY } = dimension;
          this.props.onUpdateDimension({
            ...dimension,
            oX: oX + (x - startX) * dimension.scale,
            oY: oY + (y - startY) * dimension.scale,
          });
        }
        break;

      case I.MouseMovmentType.MOVE_NODE:
        this.apply(state => {
          state.nodes.forEach(node => {
            if (node && node.selected) {
              node.x = Math.round(node.x + mouseMovment.x - mouseMovment.startX);
              node.y = Math.round(node.y + mouseMovment.y - mouseMovment.startY);
            }
          });
        });
        break;

      case I.MouseMovmentType.CREATE_LINK:
        if (!data.pending) {
          this.apply(state => {
            helpers.createLink(state, data.from, mouseMovment.data.to);
          });
        }
        break;
    }
    this.setState({
      mouseMovment: nullMouseMovment
    });
    this.nextMouseMovmentType = I.MouseMovmentType.NONE;
    this.nextMouseMovmentData = undefined;
    this.nextMouseMovmentHandleStopped = false;
  }

  private handleKeyDown: React.KeyboardEventHandler = e => {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 32:
        e.preventDefault();
        this.setState({
          grabbing: true
        });
        break;
      case 8:
      case 46:
        e.preventDefault();
        this.apply(state => reducersOf(state).deleteSelected());
        break;
    }
  }

  private handleKeyUp: React.KeyboardEventHandler = e => {
    switch (e.keyCode) {
      case 32:
        e.preventDefault();
        this.setState({
          grabbing: false
        });
        break;
    }
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

  private handleStartMouseMovment(type: I.MouseMovmentType, data?: any, stopPropagation?: boolean) {
    if (this.nextMouseMovmentHandleStopped) {
      return;
    }
    this.nextMouseMovmentType = type;
    this.nextMouseMovmentData = data;
    this.nextMouseMovmentHandleStopped = !!stopPropagation;
  }

  private handleUpdateMouseMovementData(data?: any) {
    this.setState({
      mouseMovment: { ...this.state.mouseMovment, data }
    });
  }

  private handleUpdateDimension(dimension: I.Dimension) {
    if (this.props.onUpdateDimension) {
      this.props.onUpdateDimension(dimension);
    }
  }

  private apply(producer: (oldState: I.Graph) => any) {
    if (this.props.onEdit) {
      this.props.onEdit((oldState => {
        return produce(oldState, producer)
      }));
    }
  }

}