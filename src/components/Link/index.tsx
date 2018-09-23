import * as React from 'react';
import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

export default class Node extends React.PureComponent<{
  link: I.Link
}> {
  public render() {
    const { link } = this.props;
    // const { from, to } = link;
    const x1 = 5;
    const y1 = 15 + .5;
    const x2 = 10;
    const y2 = 20 + .5;
    const path = `M${x1 - .3}h.3`
    return (
      <path d={path} />
    )
  }
}