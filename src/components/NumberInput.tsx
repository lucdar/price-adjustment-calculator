import { FormEvent } from "react";
import { Input } from "../App";

function NumberInput(props: Input) {
  function handleInput(e: FormEvent<HTMLInputElement>) {
    const inputCast = Number(e.currentTarget.value);
    if (!isNaN(inputCast)) {
      props.setState(inputCast);
    }
  }

  return (
    <>
      <label className="mt-3 block text-2xl font-medium" htmlFor={props.label}>
        {props.label}
      </label>
      <input
        className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        id={props.label}
        content={String(props.state)}
        onInput={handleInput}
      />
    </>
  );
}

export default NumberInput;
