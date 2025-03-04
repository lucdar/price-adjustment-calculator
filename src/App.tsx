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
  // The amount made by the seller after deducting taxes and processing fees
  const [revenue, setRevenue] = useState<number | null>(null);
  // Percent-based tax applied to the good being sold
  const [percentTax, setPercentTax] = useState<number | null>(null);
  // Fixed tax applied to the good being sold (e.g. bottle tax)
  const [fixedTax, setFixedTax] = useState<number | null>(null);
  // Percent-based fee from the payment processor
  const [percentProcessFee, setPercentProcessFee] = useState<number | null>(null);
  // Fixed fee from the payment processor
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
      label: "Percent-Based Tax",
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
      label: "Percent-Based Processing Fee",
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
  // Only assign priceBreakdownProps if each input has a non-null value
  if (Object.values(inputObject).every(({ state }) => state !== null)) {
    // TODO: link derivation of this equation
    const listedPrice = +(
      (revenue! + fixedProcessFee! + fixedTax! * (percentProcessFee! / 100)) /
      (1 - percentProcessFee! / 100 - (percentProcessFee! / 100) * (percentTax! / 100))
    ).toFixed(2);
    // Unrealistic inputs can lead non-finite or negative numbers
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
      {priceBreakdownProps ? (
        <PriceBreakdown {...priceBreakdownProps} />
      ) : (
        <PriceBreakdown />
      )}
      <p className="p-3 text-sm text-gray-700">
        This calculator is for informational purposes only. I do not guarantee accuracy
        and am not responsible for any decisions made based on its results. Use at your
        own risk.
      </p>
    </>
  );
}

export default App;
