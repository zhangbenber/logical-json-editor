import * as React from 'react';

import classnames from 'classnames';
import * as styles from './style.css';

export default class ToolBarButton extends React.PureComponent<{
  type: string,
}> {
  constructor(props: any) {
    super(props);
  }
  
  public render() {
    return <div className={classnames(
      styles.button,
      styles[this.props.type]
    )}>
      
    </div>
  }
}