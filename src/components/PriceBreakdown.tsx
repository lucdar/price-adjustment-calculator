import { ReactNode } from "react";

export type PriceBreakdownProps = {
  listedPrice: number;
  percentTax: number;
  fixedTax: number;
  percentProcessFee: number;
  fixedProcessFee: number;
};

function PriceBreakdown(props: PriceBreakdownProps | {}) {
  if (Object.keys(props).length === 0) {
    return (
      <div className="mt-5 flex flex-col gap-6 rounded-2xl bg-amber-100 p-5">
        <p>Missing or invalid values</p>
      </div>
    );
  }

  const { listedPrice, percentTax, fixedTax, percentProcessFee, fixedProcessFee } =
    props as PriceBreakdownProps;

  const roundCents = (x: number) => +x.toFixed(2);
  const totalTax = roundCents(fixedTax + (percentTax / 100) * listedPrice);
  const amountSubmitted = roundCents(listedPrice + totalTax);
  const totalProcessFee = roundCents(
    fixedProcessFee + (percentProcessFee / 100) * amountSubmitted,
  );
  const computedRevenue = roundCents(amountSubmitted - totalTax - totalProcessFee);

  const listedPriceSpan = <FormatPrice price={listedPrice} color="amber" />;
  const totalTaxSpan = <FormatPrice price={totalTax} color="red" />;
  const totalProcessFeeSpan = <FormatPrice price={totalProcessFee} color="blue" />;
  const computedRevenueSpan = <FormatPrice price={computedRevenue} color="green" />;
  const amountSubmittedSpan = <FormatPrice price={amountSubmitted} color="purple" />;

  return (
    <>
      <div className="mt-5 rounded-2xl bg-amber-100 p-5">
        <p className="text-left text-xl">
          <span className="font-semibold">Adjusted Price: </span>
          <span className="border-2 border-gray-800 px-1 py-0.5">
            <FormatPrice price={listedPrice} color={null} />
          </span>
        </p>
      </div>
      <div className="mt-5 rounded-2xl bg-gray-100 p-5">
        <p className="text-left text-xl">
          An item priced at {listedPriceSpan} will net {computedRevenueSpan} of revenue
          after accounting for {totalTaxSpan} in taxes and {totalProcessFeeSpan} in
          processing fees.
        </p>
        <hr className="my-2 border-gray-800"></hr>
        <PriceBreakdownLine label="Total Taxes">
          ({listedPriceSpan} × {percentTax}%) + ${fixedTax} = {totalTaxSpan}
        </PriceBreakdownLine>
        <PriceBreakdownLine label="Amount Submitted">
          {listedPriceSpan} + {totalTaxSpan} = {amountSubmittedSpan}
        </PriceBreakdownLine>
        <PriceBreakdownLine label="Total Processing">
          ({amountSubmittedSpan} × {percentProcessFee}%) + ${fixedProcessFee} ={" "}
          {totalProcessFeeSpan}
        </PriceBreakdownLine>
        <PriceBreakdownLine label="Revenue">
          {amountSubmittedSpan} - {totalTaxSpan} - {totalProcessFeeSpan} ={" "}
          {computedRevenueSpan}
        </PriceBreakdownLine>
      </div>
    </>
  );
}

interface FormatPriceProps {
  price: number;
  color: "red" | "green" | "blue" | "amber" | "purple" | null;
}

function FormatPrice({ price, color }: FormatPriceProps) {
  // Enumerating possible classnames in a comment so tailwind will include them :3
  // Backgrounds: bg-red-200 bg-green-200 bg-blue-200 bg-amber-200 bg-purple-200
  // Text Decorations: decoration-red-300 decoration-green-300 decoration-blue-300
  //                   decoration-amber-300 decoration-purple-300
  // (This is low-key insane)
  let priceString =
    "$" +
    price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  let spanClass = `font-mono px-0.5`;
  if (color) {
    spanClass += `bg-${color}-200 underline rounded-md decoration-${color}-300 decoration-2`;
  }
  return <span className={spanClass}>{priceString}</span>;
}

type PriceBreakdownLineProps = {
  label: string;
  children: ReactNode;
};

function PriceBreakdownLine(props: PriceBreakdownLineProps) {
  return (
    <p className="text-left">
      <span className="mb-4 text-xl font-bold">{props.label}: </span>
      <span className="text-l inline-block font-mono">{props.children}</span>
    </p>
  );
}

export default PriceBreakdown;
