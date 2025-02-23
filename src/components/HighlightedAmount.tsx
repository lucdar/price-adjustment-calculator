import React from "react";

interface HighlightedAmountProps {
  amount: string;
  color: "red" | "green" | "blue" | "gray";
}

const HighlightedAmount: React.FC<HighlightedAmountProps> = ({ amount, color }) => {
  return (
    <span
      className={`rounded-sm bg-${color}-100 underline decoration-${color}-300 rounded-md decoration-2`}
    >
      {amount}
    </span>
  );
};

export default HighlightedAmount;
