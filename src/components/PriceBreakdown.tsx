import PriceBreakdownLine from "./PriceBreakdownLine";

export type PriceBreakdownProps = {
  listedPrice: number,
  percentTax: number,
  fixedTax: number,
  percentProcessFee: number,
  fixedProcessFee: number,
}

function PriceBreakdown({ listedPrice, percentTax, fixedTax, percentProcessFee, fixedProcessFee }: PriceBreakdownProps) {
  const totalTax = (fixedTax + percentTax / 100 * listedPrice).toFixed(2);
  const amountSubmitted = (listedPrice + Number(totalTax)).toFixed(2);
  const totalProcessFee = (fixedProcessFee + percentProcessFee / 100 * Number(amountSubmitted)).toFixed(2);
  const computedRevenue = (Number(amountSubmitted) - Number(totalTax) - Number(totalProcessFee)).toFixed(2);

  return (
    <div>
      <PriceBreakdownLine label="Adjusted Price" content={"$" + listedPrice.toFixed(2)} />
      <PriceBreakdownLine
        label="Total Taxes"
        content={`$${fixedTax} + $${listedPrice.toFixed(2)} * ${percentTax}% = $${totalTax}`}
      />
      <PriceBreakdownLine
        label="Amount Billed"
        content={`$${listedPrice.toFixed(2)} + $${totalTax} = $${amountSubmitted}`}
      />
      <PriceBreakdownLine
        label="Total Processing"
        content={`$${fixedProcessFee} + $${amountSubmitted} * $${percentProcessFee}% = $${totalProcessFee}`}
      />
      <PriceBreakdownLine
        label="Revenue"
        content={`$${amountSubmitted} - $${totalTax} - $${totalProcessFee} = $${computedRevenue}`}
      />
    </div>
  )
}

export default PriceBreakdown;
