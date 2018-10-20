import * as React from 'react';
import * as I from 'src/typings';

import classnames from 'classnames';
import * as styles from './style.css';

let hub: DialogHub | null = null;

class DialogHub extends React.PureComponent<{}, {
  dialogs: Array<(I.DialogMeta & { id: number })>;
}> {

  private static nextId = 0;

  constructor(props: any) {
    super(props);
    this.state = {
      dialogs: []
    };
  }

  public show(dialog: I.DialogMeta) {
    const newArr = this.state.dialogs.slice();
    newArr.push({ ...dialog, id: DialogHub.nextId });
    this.setState({
      dialogs: newArr
    });
    return DialogHub.nextId++;
  }

  public hide(id: number) {
    const newArr = this.state.dialogs.slice();
    const index = newArr.findIndex(dialog => dialog.id === id);
    if (index > -1) {
      newArr.splice(index, 1);
      this.setState({
        dialogs: newArr
      });
    }
    return index > -1;
  }

  public render() {
    const { dialogs } = this.state;
    if (dialogs.length) {
      return dialogs.map((dialog, i) =>
        <div key={i}>
          {i === dialogs.length - 1 ?
            <div className={styles.mask}></div>
          : null}
          <Dialog {...dialog} />
        </div>
      )
    } else {
       return null;
    }
  }

  public componentDidMount() {
    if (!hub) {
      hub = this;
    }
  }

  public componentWillUnmount() {
    hub = null;
  }
};

export default class Dialog extends React.PureComponent<I.DialogMeta & { id?: number }> {

  public static Hub = DialogHub;

  public static show(dialog: I.DialogMeta) {
    if (hub) {
      hub.show(dialog);
    }
  }

  public static hide(id: number) {
    if (hub) {
      hub.hide(id);
    }
  }

  constructor(props: any) {
    super(props);
  }
  
  public render() {
    const { width, height, title, children, buttons, padding } = this.props;
    const hasTitle = !!title;
    const hasButtons = buttons && buttons.length;
    return <div
      className={classnames(
        styles.box,
        { [styles.noTitle]: !hasTitle },
      )}
    >
      <p className={styles.title}>
        {title}
      </p>
      <div className={styles.content}>
        <div style={{
          padding: padding === undefined ? 16 : padding
        }}>
          <div className={styles.children} style={{
            width: width || 320,
            height: height || 100,
          }}>{children}</div>
        </div>
        {hasButtons ?
          <div className={styles.buttons}>
            {buttons!.map((button, i) => <div
              key={i}
              className={classnames(
                styles.button,
                { [styles.primary]: button.primary }
              )}
              onClick={this.handleButtonClick.bind(this, button)}
              tabIndex={0}
            >
              {button.text}
            </div>)}
          </div>
        : null}
      </div>
    </div>
  }

  public handleButtonClick(button: I.DialogButtonMeta) {
    if (button.close && this.props.id !== undefined) {
      Dialog.hide(this.props.id);
    }
    if (button.onClick) {
      button.onClick();
    }
  }

}
