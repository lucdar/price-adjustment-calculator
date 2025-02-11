import { Input, InputType } from "../App";
import PercentInput from "./PercentInput";
import CurrencyInput from "./CurrencyInput";

export const labelClassName = "block text-left text-xl font-medium";
export const inputClassName = "block rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500";
export type InputsProps = {
  inputArray: Input[];
};

function Inputs(props: InputsProps) {
  return (
    <form autoComplete="off" className="rounded-2xl bg-gray-100 flex flex-col gap-4 p-5">
      {props.inputArray.map((input) => {
        switch (input.inputType) {
          case InputType.Percent:
            return <PercentInput key={input.id} {...input} />;
          case InputType.Currency:
            return <CurrencyInput key={input.id} {...input} />;
        }
      })}
    </form>
  );
}

export default Inputs;
