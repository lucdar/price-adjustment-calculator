
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
  const revenue = Number(amountSubmitted) - Number(totalTax) - Number(totalProcessFee);

  return (
    <div>
      <p className="text-left">
        <span className="mb-4 text-2xl font-bold">Adjusted Price: </span>
        <span className="text-xl">
          {"$" + listedPrice.toFixed(2)}
        </span>
      </p>
      <p className="text-left">
        <span className="mb-4 text-xl font-bold">Total Taxes: </span>
        <span className="text-l">
          ${fixedTax} + ${listedPrice.toFixed(2)} * {percentTax}% = ${totalTax}
        </span> 
      </p>
      <p className="text-left">
        <span className="mb-4 text-xl font-bold">Amount Billed: </span>
        <span className="text-l">
          ${listedPrice.toFixed(2)} + ${totalTax} = ${amountSubmitted}
        </span>
      </p>
      <p className="text-left">
        <span className="mb-4 text-xl font-bold">Total Processing: </span>
        <span className="text-l">
          ${fixedProcessFee} + ${amountSubmitted} * {percentProcessFee / 100}% = ${totalProcessFee}
        </span>
      </p>
      <p className="text-left">
        <span className="mb-4 text-xl font-bold">Revenue: </span>
        <span className="text-l">
          ${amountSubmitted} - ${totalTax} - ${totalProcessFee} = ${revenue}
        </span>
      </p>
    </div>
  )
}

export default PriceBreakdown;
