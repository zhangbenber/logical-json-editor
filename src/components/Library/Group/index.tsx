import * as React from 'react';
// import * as I from '../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

export default class LibraryGroup extends React.PureComponent<{
  title: string;
  items: any[];
}, { expanded: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      expanded: true
    };
    this.toggleExpanded = this.toggleExpanded.bind(this);
  }
  
  public render() {
    return <div className={classnames(
      styles.group,
      { [styles.expanded]: this.state.expanded }
    )}>
      <p
        className={styles.title}
        onClick={this.toggleExpanded}
        tabIndex={0}
      >{this.props.title}</p>
      <div className={styles.content}>
        {this.props.items.map((item, i) => <div
          key={i}
          className={styles.item}
          tabIndex={0}
          draggable={true}
        >123</div>)}
      </div>
    </div>
  }

  private toggleExpanded() {
    this.setState({ expanded: !this.state.expanded });
  }

}