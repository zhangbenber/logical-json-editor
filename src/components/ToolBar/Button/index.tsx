import * as React from 'react';

import classnames from 'classnames';
import * as styles from './style.css';

export default class ToolBarButton extends React.PureComponent<{
  type: string,
  onClick: (type: string) => void;
}> {
  constructor(props: any) {
    super(props);
  }
  
  public render() {
    return <div className={classnames(
      styles.button,
      styles[this.props.type]
    )} onClick={this.handleClick.bind(this)}>
      
    </div>
  }

  private handleClick() {
    this.props.onClick(this.props.type);
  }
}