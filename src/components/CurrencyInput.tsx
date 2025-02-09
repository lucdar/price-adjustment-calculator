import { Input } from "../App";
import { NumberFormatValues, NumericFormat } from "react-number-format";

function CurrencyInput(props: Input) {
  function handleValueChange({ floatValue }: NumberFormatValues) {
    props.setState(floatValue !== undefined ? floatValue : null)
  }

  return (
    <>
      <label className="mt-3 block text-left text-2xl font-medium" htmlFor={props.label}>
        {props.label}
      </label>
      <NumericFormat
        className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
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
