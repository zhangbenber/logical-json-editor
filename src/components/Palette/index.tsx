import * as React from 'react';
// import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

export default class Node extends React.PureComponent<{
  title?: string;
  tabs?: string[];
}> {
  constructor(props: any) {
    super(props);
  }
  
  public render() {
    return <div className={styles.box}>
      <p className={styles.title}>
        {this.props.title ? <span>{this.props.title}</span> : null}
        {(this.props.tabs || []).map ((tab, i) => 
          <span className={classnames(
            styles.tab,
            { [styles.active]: i === 0 },
          )}>
            {tab}
          </span>
        )}
      </p>
      <div className={styles.content}>{this.props.children}</div>
    </div>
  }

}