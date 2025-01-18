import { FormEvent, useState } from "react";
import "./App.css";
import Inputs from "./components/Inputs.tsx";

function App() {
  // The base price of the good being sold (how much the merchant would like to make)
  const [revenue, setRevenue] = useState(0);
  const [percentTax, setPercentTax] = useState(0);
  const [fixedTax, setFixedTax] = useState(0);
  const [percentProcessFee, setPercentProcessFee] = useState(0);
  const [fixedProcessFee, setfixedProcessFee] = useState(0);

  const [listedPrice, setListedPrice] = useState(NaN);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result =
      (revenue + fixedTax * percentProcessFee) /
        (1 - percentProcessFee - percentProcessFee * percentTax) +
      fixedProcessFee;
    setListedPrice(result);
  }

  return (
    <div className="bg-gray-100">
      <Inputs
        revenue={revenue}
        setRevenue={setRevenue}
        percentTax={percentTax}
        setPercentTax={setPercentTax}
        fixedTax={fixedTax}
        setFixedTax={setFixedTax}
        percentProcessFee={percentProcessFee}
        setPercentProcessFee={setPercentProcessFee}
        fixedProcessFee={fixedProcessFee}
        setFixedProcessFee={setfixedProcessFee}
        handleSubmit={handleSubmit}
      />
      <h1>{"$" + listedPrice.toFixed(2) || "Missing or invalid inputs"}</h1>
    </div>
  );
}

export default App;
