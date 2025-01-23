import { Input } from "../App";
import { NumberFormatValues, NumericFormat } from "react-number-format";

function PercentInput(props: Input) {
  function handleValueChange({ floatValue }: NumberFormatValues) {
    if (floatValue) {
      props.setState(floatValue);
    }
  }

  return (
    <>
      <label className="mt-3 block text-2xl font-medium" htmlFor={props.label}>
        {props.label}
      </label>
      <NumericFormat
        className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        prefix="%"
        id={props.label}
        value={props.state}
        onValueChange={handleValueChange}
      />
    </>
  );
}

export default PercentInput;
