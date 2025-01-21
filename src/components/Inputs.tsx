import { FormEvent } from "react";
import { Input } from "../App";
import NumberInput from "./NumberInput";

export type InputsProps = {
  inputArray: Input[];
  handleSubmit: (e: FormEvent) => void;
};

function Inputs(props: InputsProps) {
  return (
    <form
      autoComplete="off"
      onSubmit={props.handleSubmit}
      className="mb-6 flex flex-col gap-4 p-5"
    >
      {props.inputArray.map((input) => {
        return <NumberInput key={input.id} {...input} />;
      })}
      <input type="submit" hidden />
    </form>
  );
}

export default Inputs;
