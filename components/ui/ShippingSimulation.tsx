import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";

export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-4 py-3 border-y border-y-gainsboro">
      <li class="flex items-center text-white leading-[14px] text-xs bg-[#353535] font-univers-next-pro-light py-2 pl-2">
        <span class="min-w-[80px]">
          valor
        </span>

        <span>
          prazo de entrega
        </span>
      </li>

      {methods.map((method) => (
        <li class="flex items-center text-[#979899] leading-[16px] text-sm pl-2">
          <span class="min-w-[80px]">
            {method.price === 0 ? "frete grátis" : (
              formatPrice(method.price / 100, currencyCode, locale)
            )}
          </span>

          <span>
            em até {formatShippingEstimate(method.shippingEstimate)}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    const definitivePostalCode = postalCode.value.replace("-", "");

    if (definitivePostalCode.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: definitivePostalCode,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, []);

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <span>calcule seu frete e o prazo de entrega</span>
      </div>

      <form
        class="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSimulation();
        }}
      >
        <input
          as="input"
          type="text"
          class="border border-gray bg-ice-cube text-sm text-black w-full h-10 max-w-[195px] pl-1"
          placeholder=""
          aria-label="shipping simulation"
          value={postalCode.value}
          maxLength={9}
          size={9}
          onChange={(e: { currentTarget: { value: string } }) => {
            postalCode.value = e.currentTarget.value;
          }}
        />
        <Button
          type="submit"
          loading={loading.value}
          class="max-w-[124px] lowercase flex items-center justify-center min-h-[40px] max-h-[40px] rounded-none border border-dark-gray bg-transparent hover:bg-dark-gray hover:text-white w-full text-sm duration-200 transition-colors font-semibold"
        >
          calcular
        </Button>
      </form>

      <div class="flex flex-col pt-1">
        <a
          target="_blank"
          href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
        >
          não lembra o cep?
        </a>
      </div>

      <div>
        <div>
          <ShippingContent simulation={simulateResult} />
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;
