import { FormEvent } from "react";
import NumberInput from "./NumberInput";

type SetNumber = React.Dispatch<React.SetStateAction<number>>;

export type InputsProps = {
  revenue: number;
  setRevenue: SetNumber;
  percentTax: number;
  setPercentTax: SetNumber;
  fixedTax: number;
  setFixedTax: SetNumber;
  percentProcessFee: number;
  setPercentProcessFee: SetNumber;
  fixedProcessFee: number;
  setFixedProcessFee: SetNumber;
  handleSubmit: (e: FormEvent) => void;
};

function Inputs(props: InputsProps) {
  return (
    <form
      autoComplete="off"
      onSubmit={props.handleSubmit}
      className="mb-6 flex flex-col gap-4 p-5"
    >
      <NumberInput
        label="Revenue"
        value={props.revenue}
        update={props.setRevenue}
      />
      <NumberInput
        label="Percent Tax"
        value={props.percentTax}
        update={props.setPercentTax}
      />
      <NumberInput
        label="Fixed Tax"
        value={props.fixedTax}
        update={props.setFixedTax}
      />
      <NumberInput
        label="Percent Processing Fee"
        value={props.percentProcessFee}
        update={props.setPercentProcessFee}
      />
      <NumberInput
        label="Fixed Processing Fee"
        value={props.fixedProcessFee}
        update={props.setFixedProcessFee}
      />
      <input type="submit" hidden />
    </form>
  );
}

export default Inputs;
