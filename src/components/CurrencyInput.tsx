import { Input } from "../App";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { inputClassName, labelClassName } from "./Inputs";

function CurrencyInput(props: Input) {
  function handleValueChange({ floatValue }: NumberFormatValues) {
    props.setState(floatValue !== undefined ? floatValue : null);
  }

  return (
    <>
      <label className={labelClassName} htmlFor={props.label}>
        {props.label}
      </label>
      <NumericFormat
        className={inputClassName}
        prefix="$"
        decimalScale={2}
        fixedDecimalScale={true}
        id={props.label}
        value={props.state}
        onValueChange={handleValueChange}
        placeholder={props.placeholder}
      />
    </>
  );
}

export default CurrencyInput;
