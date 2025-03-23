import React from "react";
import { Input } from "./Calculator";
import { inputClassName, labelClassName } from "./Inputs";
import { NumberFormatValues, NumericFormat } from "react-number-format";

const PercentInput: React.FC<Input> = ({ setState, state, label, placeholder }) => {
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
};

export default PercentInput;
