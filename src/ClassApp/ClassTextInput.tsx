import { Component } from "react";
import { InputProps } from "../types";

export class ClassTextInput extends Component<{
  label: string;
  inputProps: InputProps;
  isPhone: boolean;
}> {
  render() {
    const { label, inputProps, isPhone } = this.props;
    return isPhone ? (
      <input {...inputProps} />
    ) : (
      <div className="input-wrap">
        <label htmlFor="">{label}</label>
        <input {...inputProps} />
      </div>
    );
  }
}
