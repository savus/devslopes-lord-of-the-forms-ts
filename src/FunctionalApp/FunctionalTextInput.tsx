import { InputProps } from "../types";

export function FunctionalTextInput({
  label,
  inputProps,
  isPhoneInput,
}: {
  label: string;
  inputProps: InputProps;
  isPhoneInput: boolean;
}) {
  return isPhoneInput ? (
    <input {...inputProps} />
  ) : (
    <div className="input-wrap">
      <label>{label}:</label>
      <input {...inputProps} />
    </div>
  );
}
