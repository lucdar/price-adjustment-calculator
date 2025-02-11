type PriceBreakdownLineProps = {
  content: string,
  label: string,
};

function PriceBreakdownLine(props: PriceBreakdownLineProps) {
  return (
    <p className="text-left">
      <span className="mb-4 text-xl font-bold">{props.label}: </span>
      <span className="inline-block text-l">
        {props.content}
      </span>
    </p>
  )
}

export default PriceBreakdownLine;
