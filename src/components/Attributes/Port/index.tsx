import * as React from 'react';
// import nodeMeta from '../../../meta';
import * as I from '../../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

export default class Attributes extends React.PureComponent<{
  meta: I.PortMeta;
}> {
  constructor(props: any) {
    super(props);
  }
  
  public render() {
    const { meta } = this.props;
    return <div
      className={classnames(styles.port)}
      key={meta.name}
    >
      <p><strong>{meta.name} : </strong>{meta.desc}</p>
      <p className={styles.conn}>
        <em>&lt;未连接&gt;</em>
        {meta.direction === I.PortDirection.IN ? <a className={styles.constant}>指定常量</a> : null}
      </p>
    </div>
  }

}