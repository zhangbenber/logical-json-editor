import * as React from 'react';
// import * as I from '../../typings';

// import classnames from 'classnames';
import * as styles from './style.css';

export default class Node extends React.PureComponent<{
  title: string;
}> {
  constructor(props: any) {
    super(props);
  }
  
  public render() {
    return <div className={styles.box}>
      <p className={styles.title}>{this.props.title}</p>
      <div className={styles.content}>{this.props.children}</div>
    </div>
  }

}