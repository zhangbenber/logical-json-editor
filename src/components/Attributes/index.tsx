import * as React from 'react';
// import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

import Palette from '../Palette';

export default class Attributes extends React.PureComponent<{
  className?: any;
}> {
  constructor(props: any) {
    super(props);
  }
  
  public render() {
    return <div className={classnames(styles.box, this.props.className || '')}>
      <Palette title="Attributes" />
    </div>
  }

}