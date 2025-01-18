import { FormEvent, Dispatch, SetStateAction } from "react";

type NumberInputProps = {
  label: string;
  value: number;
  update: Dispatch<SetStateAction<number>>;
};

function NumberInput(props: NumberInputProps) {
  function handleInput(e: FormEvent<HTMLInputElement>) {
    const inputCast = Number(e.currentTarget.value);
    if (!isNaN(inputCast)) {
      props.update(inputCast);
    }
  }

  return (
    <>
      <label className="mt-3 block text-sm font-medium" htmlFor={props.label}>
        {props.label}
      </label>
      <input
        className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        id={props.label}
        content={String(props.value)}
        onInput={handleInput}
      />
    </>
  );
}

export default NumberInput;
