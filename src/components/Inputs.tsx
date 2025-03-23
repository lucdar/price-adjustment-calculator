import { InputObject } from "./Calculator";
import PercentInput from "./PercentInput";
import CurrencyInput from "./CurrencyInput";

export const labelClassName = "block text-left text-xl font-medium";
export const inputClassName =
  "block rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500";
export type InputsProps = InputObject;

function Inputs({
  revenue,
  percentTax,
  fixedTax,
  percentProcessFee,
  fixedProcessFee,
}: InputsProps) {
  return (
    <form autoComplete="off" className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-2xl bg-green-100 p-4">
        <CurrencyInput {...revenue} />
      </div>
      <div className="flex flex-col gap-4 rounded-2xl bg-red-100 p-4">
        <PercentInput {...percentTax} />
        <CurrencyInput {...fixedTax} />
      </div>
      <div className="flex flex-col gap-4 rounded-2xl bg-blue-100 p-4">
        <PercentInput {...percentProcessFee} />
        <CurrencyInput {...fixedProcessFee} />
      </div>
    </form>
  );
}

export default Inputs;
