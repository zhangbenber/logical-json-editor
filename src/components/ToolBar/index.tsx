import * as React from 'react';

import classnames from 'classnames';
import * as styles from './style.css';

import Button from './Button';

export default class ToolBar extends React.PureComponent<{
  className?: any;
  onButtonClick?: (type: string) => void;
}> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
    return <div className={classnames(styles.bar, this.props.className || '')}>
      <div className={styles.logo}><strong>LogicJSON</strong> Graphic Editor</div>
      {this.renderButtonGroup(['new', 'open', 'save'])}
      {this.renderButtonGroup(['code'])}
    </div>
  }

  private renderButtonGroup(buttons: string[]) {
    return [
      <div className={styles.split} key="|" />,
      ...buttons.map(button =>
        <Button type={button} onClick={this.handleClick} key={button} />
      )
    ]
  }

  private handleClick(type: string) {
    if (this.props.onButtonClick) {
      this.props.onButtonClick(type);
    }
  }
}