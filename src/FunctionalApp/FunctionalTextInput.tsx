export function FunctionalTextInput({label, inputProps}: {label: string, inputProps: InputProps}) {
  return (
    <div className="input-wrap">
      <label>{label}:</label>
      <input {...inputProps} />
    </div>
  );
}
