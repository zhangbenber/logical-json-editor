import * as React from 'react';
import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

import Palette from '../Palette';
import Group from './Group';

export default class Library extends React.PureComponent<{
  className?: any;
  onDrag?: (data: I.Node) => void;
}> {
  constructor(props: any) {
    super(props);
  }
  
  public render() {
    return <div className={classnames(styles.box, this.props.className || '')}>
      <Palette title="Library">
        <div className={styles.search}>
          <span>Search: </span>
          <input className={styles.searchInput} type="text" />
        </div>
        <div className={styles.content}>
          <Group title="Logic" items={[123,123]} />
          <Group title="Math" items={[123,123,123]} />
        </div>
      </Palette>
    </div>
  }

}