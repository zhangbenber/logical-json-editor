import * as React from 'react';
import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

import Link from '../Link';
import Node from '../Node';

import produce from 'immer';
import reducersOf from '../../reducers';

export default class Graph extends React.PureComponent<{
  graph: I.Graph,
  dimension: I.Dimension,
  className?: any,
  onEdit?: (reducer: ((oldState: I.Graph) => I.Graph)) => void;
}, {
  width: number,
  height: number,
}> {
  public state = {
    width: 0,
    height: 0,
  }

  private box: HTMLDivElement | null = null;

  constructor(props: any) {
    super(props);
    this.handleSelectNode = this.handleSelectNode.bind(this);
    this.handleDeselectAll = this.handleDeselectAll.bind(this);
  }

  public render() {
    const { nodes, links } = this.props.graph;
    return (
      <div
        className={classnames(this.props.className, styles.box)}
        ref={r => this.calcSize(r)}
      >
        <svg
          className={styles.view}
          width={this.state.width}
          height={this.state.height}
          viewBox={this.calcViewBox()}
          onMouseDown={this.handleDeselectAll}
        >
          {this.renderDefs()}
          <rect
            x="-100"
            y="-100"
            width="200"
            height="200"
            fill="url(#grid)"
          />
          {nodes.map((node, id) => 
            node ? <Node
              id={id}
              node={node}
              key={id}
              onSelect={this.handleSelectNode}
            /> : null)
          }
          {links.map((link) =>
            <Link
              link={link}
              key={link.id}
              fromNode={nodes[link.from.nodeId] as I.Node}
              toNode={nodes[link.to.nodeId] as I.Node}
            />)
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

  private apply(producer: (oldState: I.Graph) => any) {
    if (this.props.onEdit) {
      this.props.onEdit((oldState => {
        return produce(oldState, producer)
      }));
    }
  }

}