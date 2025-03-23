import React from "react";
import { Input } from "./Calculator";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { inputClassName, labelClassName } from "./Inputs";

const CurrencyInput: React.FC<Input> = ({ setState, state, label, placeholder }) => {
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
        prefix="$"
        decimalScale={2}
        fixedDecimalScale={true}
        id={label}
        value={state}
        onValueChange={handleValueChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default CurrencyInput;
