import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="max-h-[35px] join border rounded-none w-min ">
      <Button
        class="w-[35px] h-[35px] btn-ghost join-item"
        onClick={decrement}
        disabled={disabled}
        loading={loading}
        hasBtn={false}
      >
        -
      </Button>
      <input
        class="w-5 text-center join-item [appearance:textfield]"
        type="number"
        inputMode="numeric"
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
        class="w-[35px] h-[35px] btn-ghost join-item"
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
