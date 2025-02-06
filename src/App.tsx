import { Dispatch, SetStateAction, useState } from "react";
import "./App.css";
import Inputs from "./components/Inputs.tsx";
import PriceBreakdown from "./components/PriceBreakdown.tsx"; 

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
  const [revenue, setRevenue] = useState(20);
  const [percentTax, setPercentTax] = useState(9.75);
  const [fixedTax, setFixedTax] = useState(0.25);
  const [percentProcessFee, setPercentProcessFee] = useState(2.75);
  const [fixedProcessFee, setFixedProcessFee] = useState(0.05);

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

  const listedPrice =
    (revenue + fixedProcessFee + (fixedTax * (percentProcessFee / 100))) /
    (1 - percentProcessFee / 100 - (percentProcessFee / 100) * (percentTax / 100));

  const realTaxes = percentTax / 100 * (listedPrice) + fixedTax;
  const realProcessing = percentProcessFee / 100 * (listedPrice + realTaxes) + fixedProcessFee;

  const realRevenue = listedPrice - realProcessing;

  return (
    <>
      <div className="rounded-2xl bg-gray-100">
        <Inputs inputArray={inputArray} />
      </div>
      <div className="rounded-2xl bg-gray-100">
        {listedPrice ?
          <PriceBreakdown {...{listedPrice, percentTax, fixedTax, percentProcessFee, fixedProcessFee, realRevenue}} /> :
          <p>Missing or invalid inputs</p>}
      </div>
    </>
  );
}

export default App;
