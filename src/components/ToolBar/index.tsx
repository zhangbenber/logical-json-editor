import * as React from 'react';

import classnames from 'classnames';
import * as styles from './style.css';

import Button from './Button';

export default class ToolBar extends React.PureComponent<{
  className?: any;
}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return <div className={classnames(styles.bar, this.props.className || '')}>
      <div className={styles.logo}><strong>LogicJSON</strong> Graphic Editor</div>
      <div className={styles.split} />
      <Button type="new" />
      <Button type="open" />
      <Button type="save" />
    </div>
  }
}