import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import "./App.css";
import Inputs from "./components/Inputs.tsx";

export enum InputType {
  Percent,
  Currency,
}

export interface Input {
  id: string;
  label: string;
  inputType: InputType;
  state: number;
  setState: Dispatch<SetStateAction<number>>;
}

function App() {
  // The base price of the good being sold (how much the merchant would like to make)
  const [revenue, setRevenue] = useState(0);
  const [percentTax, setPercentTax] = useState(0);
  const [fixedTax, setFixedTax] = useState(0);
  const [percentProcessFee, setPercentProcessFee] = useState(0);
  const [fixedProcessFee, setFixedProcessFee] = useState(0);
  const inputArray: Input[] = [
    {
      id: "revenue",
      label: "Desired Revenue",
      inputType: InputType.Currency,
      state: revenue,
      setState: setRevenue,
    },
    {
      id: "percentTax",
      label: "Percent Tax",
      inputType: InputType.Percent,
      state: percentTax,
      setState: setPercentTax,
    },
    {
      id: "fixedTax",
      label: "Fixed Tax",
      inputType: InputType.Currency,
      state: fixedTax,
      setState: setFixedTax,
    },
    {
      id: "percentProcessFee",
      label: "Percent Processing Fee",
      inputType: InputType.Percent,
      state: percentProcessFee,
      setState: setPercentProcessFee,
    },
    {
      id: "fixedProcessFee",
      label: "Fixed Processing Fee",
      inputType: InputType.Currency,
      state: fixedProcessFee,
      setState: setFixedProcessFee,
    },
  ];

  const [listedPrice, setListedPrice] = useState(NaN);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const listedPrice =
      (revenue + fixedTax * percentProcessFee) /
        (1 - percentProcessFee - percentProcessFee * percentTax) +
      fixedProcessFee;
    setListedPrice(listedPrice);
  }

  return (
    <div className="bg-gray-100">
      <Inputs inputArray={inputArray} handleSubmit={handleSubmit} />
      <h1>{listedPrice ? "$" + listedPrice.toFixed(2) : "Missing or invalid inputs"}</h1>
    </div>
  );
}

export default App;
