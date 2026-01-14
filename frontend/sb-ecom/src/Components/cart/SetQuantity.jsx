const btnStyles = "border-[1.2px] border-slate-600 px-3 py-1 rounded";

const SetQuantity = ({
  quantity,
  cardCounter,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex items-center gap-8">
      {cardCounter ? null : <div className="font-semibold">quantity</div>}
      <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
        <button
          disabled={quantity <= 1}
          className={btnStyles}
          onClick={handleQtyDecrease}
        >
          -
        </button>

        <div className="text-red-500">{quantity}</div>

        <button
          className={btnStyles}
          onClick={handleQtyIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
