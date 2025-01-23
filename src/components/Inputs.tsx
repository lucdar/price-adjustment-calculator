import { Input, InputType } from "../App";
import PercentInput from "./PercentInput";
import CurrencyInput from "./CurrencyInput";

export type InputsProps = {
  inputArray: Input[];
};

function Inputs(props: InputsProps) {
  return (
    <>
      <h1 className="em">Inputs</h1>
      <form autoComplete="off" className="mb-6 flex flex-col gap-4 p-5">
        {props.inputArray.map((input) => {
          switch (input.inputType) {
            case InputType.Percent:
              return <PercentInput key={input.id} {...input} />;
            case InputType.Currency:
              return <CurrencyInput key={input.id} {...input} />;
          }
        })}
      </form>
    </>
  );
}

export default Inputs;
