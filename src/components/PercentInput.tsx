import { Input } from "./Calculator";
import { inputClassName, labelClassName } from "./Inputs";
import { NumberFormatValues, NumericFormat } from "react-number-format";

function PercentInput({ setState, state, label, placeholder }: Input) {
  function handleValueChange({ floatValue }: NumberFormatValues) {
    setState(floatValue !== undefined ? floatValue : null);
  }

  return (
    <>
      <label className={labelClassName} htmlFor={label}>
        {label}
      </label>
      <NumericFormat
        className={inputClassName}
        suffix="%"
        id={label}
        value={state}
        onValueChange={handleValueChange}
        placeholder={placeholder}
      />
    </>
  );
}

export default PercentInput;
