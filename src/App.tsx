import { Dispatch, SetStateAction, useState } from "react";
import "./App.css";
import Inputs from "./components/Inputs.tsx";
import PriceBreakdown, { PriceBreakdownProps } from "./components/PriceBreakdown.tsx";

export type InputType = "Percent" | "Currency";

export interface Input {
  label: string;
  inputType: InputType;
  state: number | null;
  setState: Dispatch<SetStateAction<number | null>>;
  placeholder: string;
}

export type InputObject = {
  revenue: Input;
  percentTax: Input;
  fixedTax: Input;
  percentProcessFee: Input;
  fixedProcessFee: Input;
};

function App() {
  // The base price of the good being sold (how much the merchant would like to make)
  const [revenue, setRevenue] = useState<number | null>(null);
  const [percentTax, setPercentTax] = useState<number | null>(null);
  const [fixedTax, setFixedTax] = useState<number | null>(null);
  const [percentProcessFee, setPercentProcessFee] = useState<number | null>(null);
  const [fixedProcessFee, setFixedProcessFee] = useState<number | null>(null);

  const inputObject: InputObject = {
    revenue: {
      label: "Desired Revenue",
      inputType: "Currency",
      state: revenue,
      setState: setRevenue,
      placeholder: "e.g. $20.00",
    },
    percentTax: {
      label: "Percent Tax",
      inputType: "Percent",
      state: percentTax,
      setState: setPercentTax,
      placeholder: "e.g. 9.75%",
    },
    fixedTax: {
      label: "Fixed Tax",
      inputType: "Currency",
      state: fixedTax,
      setState: setFixedTax,
      placeholder: "e.g. $0.25",
    },
    percentProcessFee: {
      label: "Percent Processing Fee",
      inputType: "Percent",
      state: percentProcessFee,
      setState: setPercentProcessFee,
      placeholder: "e.g. 2.75%",
    },
    fixedProcessFee: {
      label: "Fixed Processing Fee",
      inputType: "Currency",
      state: fixedProcessFee,
      setState: setFixedProcessFee,
      placeholder: "e.g. $0.05",
    },
  };

  let priceBreakdownProps: PriceBreakdownProps | null = null;
  if (Object.values(inputObject).every(({ state }) => state !== null)) {
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
      <h1 className="mb-3 p-2 text-left text-2xl">Price Adjustment Calculator</h1>
      <Inputs {...inputObject} />
      <div className="mt-5 flex flex-col gap-6 rounded-2xl bg-gray-100 p-5">
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
