import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
  isPdp?: boolean;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector(
  { onChange, quantity, disabled, loading, isPdp }: Props,
) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div
      class={`${
        isPdp ? "max-h-[48px]" : "max-h-[35px]"
      }  join border rounded-none w-min`}
    >
      <Button
        class="btn-ghost join-item"
        style={{
          width: `${isPdp ? "42px" : "30px"}`,
          height: `${isPdp ? "48px" : "35px"}`,
        }}
        onClick={decrement}
        disabled={disabled}
        loading={loading}
        hasBtn={false}
      >
        -
      </Button>
      <input
        class={`${
          isPdp ? "w-10 md:w-16" : "w-5"
        } text-center join-item [appearance:textfield] font-semibold`}
        type="number"
        inputMode="numeric"
        aria-label="change number"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <Button
        class="h-[35px] btn-ghost join-item"
        style={{
          width: `${isPdp ? "42px" : "30px"}`,
          height: `${isPdp ? "48px" : "35px"}`,
        }}
        onClick={increment}
        disabled={disabled}
        loading={loading}
        hasBtn={false}
      >
        +
      </Button>
    </div>
  );
}

export default QuantitySelector;
