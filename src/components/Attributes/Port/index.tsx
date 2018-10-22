import * as React from 'react';
// import nodeMeta from '../../../meta';
import * as I from '../../../typings';

import classnames from 'classnames';
import * as styles from './style.css';

export default class AttributesPort extends React.PureComponent<{
  meta: I.PortMeta;
  port: I.Port;
  onChangeConstant?: (constant: any, constantInput?: any, constantError?: boolean) => void;
}, {
  constantInput?: any;
  constantShouldFocus: boolean;
}> {
  constructor(props: any) {
    super(props);
    this.handleConstantInputChange = this.handleConstantInputChange.bind(this);
    this.handleConstantKeyDown = this.handleConstantKeyDown.bind(this);
    this.handleEnableConstant = this.handleEnableConstant.bind(this);
    this.handleDisableConstant = this.handleDisableConstant.bind(this);
    this.handleConstantCommit = this.handleConstantCommit.bind(this);
    this.constnatInputMounted = this.constnatInputMounted.bind(this);
    this.state = {
      constantInput: this.props.port.constantInput,
      constantShouldFocus: false
    };
  }
  
  public render() {
    const { meta, port } = this.props;
    const isInput = port.direction === I.PortDirection.IN;
    const connected = !!port.linkIds.length;
    const isConstant = port.constantInput !== undefined;
    return <div
      className={classnames(styles.port)}
    >
      <div><strong>{port.name} : </strong>{meta.desc}</div>
      <div className={classnames(
        styles.conn,
        [styles.output, styles.input][+isInput],
        { [styles.connected]: connected, [styles.constant]: isConstant, [styles.error]: port.constantError }
      )}>
        {
          isConstant ?
            <div className={styles.constantBox}>
              <div className={styles.constantContent}>
                {this.renderConstant(meta.type)}
              </div>
              <div className={styles.constantClear} onClick={this.handleDisableConstant} />
            </div>
          : <div>
            {connected ? (
              isInput ? '输入已连接' : `有 ${port.linkIds.length} 个输出`
            ) : <em>&lt;{isInput ? '输入' : '输出'}未连接&gt;</em>}
            {(isInput && !connected) ?
              <a className={styles.link} onClick={this.handleEnableConstant}>指定常量</a>
            : null}
          </div>
        }
      </div>
    </div>
  }

  public componentWillUnmount() {
    if (this.state.constantInput !== this.props.port.constantInput) {
      this.handleConstantCommit();
    }
  }

  private renderConstant(type: I.PortType) {
    const value = this.state.constantInput;
    switch (type) {
      case I.PortType.STRING:
        return <input type="text" value={value} onChange={this.handleConstantInputChange} onKeyDown={this.handleConstantKeyDown} onBlur={this.handleConstantCommit} ref={this.constnatInputMounted} placeholder="请输入 JSON 字符串" />;
      default:
        return <input type="text" value={value} onChange={this.handleConstantInputChange} onKeyDown={this.handleConstantKeyDown} onBlur={this.handleConstantCommit} ref={this.constnatInputMounted} placeholder="请输入 JSON 字符串" />;
    }
  }

  private handleConstantInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({
      constantInput: e.currentTarget.value
    });
  }

  private handleConstantKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.setState({
        constantInput: e.currentTarget.value
      });
      e.currentTarget.blur();
    }
  }

  private handleEnableConstant() {
    if (this.props.onChangeConstant) {
      this.props.onChangeConstant(undefined, '', true);
      this.setState({
        constantInput: '',
        constantShouldFocus: true,
      });
    }
  }

  private handleDisableConstant() {
    if (this.props.onChangeConstant) {
      this.props.onChangeConstant(undefined, undefined, undefined);
    }
  }

  private handleConstantCommit() {
    const { constantInput } = this.state;
    let constant: any;
    try {
      constant = JSON.parse(constantInput)
    } catch (e) {
      console.log(e);
    }
    if (this.props.onChangeConstant) {
      this.props.onChangeConstant(constant, constantInput, constant === undefined);
    }
  }

  private constnatInputMounted(dom: HTMLInputElement | null) {
    if (dom && this.state.constantShouldFocus) {
      dom.focus();
      this.setState({
        constantShouldFocus: false
      });
    }
  }

}