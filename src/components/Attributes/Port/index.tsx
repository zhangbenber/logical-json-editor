import * as React from 'react';
// import nodeMeta from '../../../meta';
import * as I from '../../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

export default class Attributes extends React.PureComponent<{
  meta: I.PortMeta;
  port: I.Port;
}> {
  constructor(props: any) {
    super(props);
  }
  
  public render() {
    const { meta, port } = this.props;
    const isInput = port.direction === I.PortDirection.IN;
    const connected = !!port.linkIds.length;
    const isConstant = port.constant !== undefined;
    return <div
      className={classnames(styles.port)}
    >
      <p><strong>{port.name} : </strong>{meta.desc}</p>
      <p className={classnames(
        styles.conn,
        [styles.output, styles.input][+isInput],
        { [styles.connected]: connected, [styles.constant]: isConstant }
      )}>
        {
          isConstant ?
            this.renderConstant(port.constant)
          : <div>
            {connected ? (
              isInput ? '输入已连接' : `有 ${port.linkIds.length} 个输出`
            ) : <em>&lt;{isInput ? '输入' : '输出'}未连接&gt;</em>}
            {(isInput && !connected) ?
              <a className={styles.link}>指定常量</a>
            : null}
          </div>
        }
      </p>
    </div>
  }

  private renderConstant(constant: any) {
    return constant;
  }

}