import { Input } from "../App";
import { inputClassName, labelClassName } from "./Inputs"; 
import { NumberFormatValues, NumericFormat } from "react-number-format";

function PercentInput(props: Input) {
  function handleValueChange({ floatValue }: NumberFormatValues) {
    props.setState(floatValue !== undefined ? floatValue : null)
  }

  return (
    <>
      <label className={labelClassName} htmlFor={props.label}>
        {props.label}
      </label>
      <NumericFormat
        className={inputClassName}
        suffix="%"
        id={props.label}
        value={props.state}
        onValueChange={handleValueChange}
        placeholder={props.placeholder}
      />
    </>
  );
}

export default PercentInput;
