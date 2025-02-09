import { Dispatch, SetStateAction, useState } from "react";
import "./App.css";
import Inputs from "./components/Inputs.tsx";
import PriceBreakdown, { PriceBreakdownProps } from "./components/PriceBreakdown.tsx";

export enum InputType {
  Percent,
  Currency,
}

export interface Input {
  id: string;
  label: string;
  inputType: InputType;
  state: number | null;
  setState: Dispatch<SetStateAction<number | null>>;
  placeholder: string;
}

function App() {
  // The base price of the good being sold (how much the merchant would like to make)
  const [revenue, setRevenue] = useState<number | null>(null);
  const [percentTax, setPercentTax] = useState<number | null>(null);
  const [fixedTax, setFixedTax] = useState<number | null>(null);
  const [percentProcessFee, setPercentProcessFee] = useState<number | null>(null);
  const [fixedProcessFee, setFixedProcessFee] = useState<number | null>(null);

  const inputArray: Input[] = [
    {
      id: "revenue",
      label: "Desired Revenue",
      inputType: InputType.Currency,
      state: revenue,
      setState: setRevenue,
      placeholder: "e.g. $20.00",
    },
    {
      id: "percentTax",
      label: "Percent Tax",
      inputType: InputType.Percent,
      state: percentTax,
      setState: setPercentTax,
      placeholder: "e.g. 9.75%",
    },
    {
      id: "fixedTax",
      label: "Fixed Tax",
      inputType: InputType.Currency,
      state: fixedTax,
      setState: setFixedTax,
      placeholder: "e.g. $0.25",
    },
    {
      id: "percentProcessFee",
      label: "Percent Processing Fee",
      inputType: InputType.Percent,
      state: percentProcessFee,
      setState: setPercentProcessFee,
      placeholder: "e.g. 2.75%",
    },
    {
      id: "fixedProcessFee",
      label: "Fixed Processing Fee",
      inputType: InputType.Currency,
      state: fixedProcessFee,
      setState: setFixedProcessFee,
      placeholder: "e.g. $0.05",
    },
  ];

  let priceBreakdownProps: PriceBreakdownProps | null = null;
  if (inputArray.every(({ state }) => state !== null)) {
    const listedPrice = +(
      (revenue! + fixedProcessFee! + fixedTax! * (percentProcessFee! / 100)) /
      (1 - percentProcessFee! / 100 - (percentProcessFee! / 100) * (percentTax! / 100))
    ).toFixed(2);
    if (isFinite(listedPrice) && listedPrice > 0) {
      priceBreakdownProps = {
        listedPrice: listedPrice,
        percentTax: percentTax!,
        fixedTax: fixedTax!,
        percentProcessFee: percentProcessFee!,
        fixedProcessFee: fixedProcessFee!,
      };
    }
  }

  return (
    <>
      <div className="rounded-2xl bg-gray-100">
        <Inputs inputArray={inputArray} />
      </div>
      <div className="rounded-2xl bg-gray-100">
        {priceBreakdownProps ? (
          <PriceBreakdown {...priceBreakdownProps} />
        ) : (
          <p>Missing or invalid inputs</p>
        )}
      </div>
    </>
  );
}

export default App;
