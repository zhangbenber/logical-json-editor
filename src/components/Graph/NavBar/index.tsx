import * as React from 'react';
import * as I from 'src/typings';

import classnames from 'classnames';
import * as styles from './style.css';

interface GraphNavBarProps {
  graph: I.Graph;
  dimension: I.Dimension;
  onUpdateDimension?: (dimension: I.Dimension) => void;
}

export default class GraphNavBar extends React.PureComponent<GraphNavBarProps> {
  constructor(props: any) {
    super(props);
    this.handleSlide = this.handleSlide.bind(this);
  }
  
  public render() {
    return <div className={styles.bar}>
      <div className={classnames(styles.button, styles.long, styles.split)}>{Math.round(this.props.dimension.scale / 25 * 100)}%</div>
      <div className={styles.button} onClick={this.handleZoom.bind(this, -1)}>-</div>
      <div className={styles.slider} onMouseDown={this.handleSlide} onMouseMove={this.handleSlide}>
        <div className={styles.track}>
          <div className={styles.thumb} style={{
            left: `${Math.log(this.props.dimension.scale / 25) / Math.log(1.028) + 56}px`
          }} />
        </div>
      </div>
      <div className={classnames(styles.button, styles.split)} onClick={this.handleZoom.bind(this, 1)}>+</div>
      <div className={classnames(styles.button, styles.long)}>导览</div>
    </div>
  }

  private handleSlide: React.MouseEventHandler = e => {
    if (e.buttons) {
      const boundary = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - boundary.left;
      let ratio = Math.pow(1.028, x - 64);
      if (ratio > 2) {
        ratio = 2;
      } else if (ratio < .2) {
        ratio = .2;
      }
      const ticks = [.2, .5, 1, 2];
      ticks.some(tick => {
        if (ratio / tick > .9 && tick / ratio > .9) {
          ratio = tick;
          return true;
        }
        return false;
      });
      this.zoom(ratio);
    }
  }

  private handleZoom(step: number) {
    const { dimension } = this.props;
    const ticks = [.2, .25, .33333333333, .4, .5, .66666666667, .75, .85, 1, 1.25, 1.5, 1.6666666667, 2];
    for (let i = [ticks.length - 1, 0, 0][step + 1]; i >= 0 && i < ticks.length; i += step) {
      if ([ticks[i] < dimension.scale / 25, false, ticks[i] > dimension.scale / 25][step + 1]) {
        this.zoom(ticks[i]);
        break;
      }
    }
  }

  private zoom(ratio: number) {
    const { dimension } = this.props;
    const scale = ratio * 25;
    if (scale !== dimension.scale && this.props.onUpdateDimension) {
      const oX = (dimension.oX - dimension.width / 2) * scale / dimension.scale + dimension.width / 2;
      const oY = (dimension.oY - dimension.height / 2) * scale / dimension.scale + dimension.height / 2;
      this.props.onUpdateDimension({
        ...dimension,
        scale, oX, oY
      });
    }
  }
}