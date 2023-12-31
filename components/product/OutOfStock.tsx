import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { Product } from "apps/commerce/types.ts";
import type { JSX } from "preact";

export interface Props {
  productID: Product["productID"];
}

function Notify({ productID }: Props) {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.notifyme({ skuId: productID, name, email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <form class="form-control justify-start gap-2" onSubmit={handleSubmit}>
      <span class="text-base font-univers-next-pro-bold font-normal">
        este produto está indisponivel no momento
      </span>
      <span class="text-sm">avise-me quando estiver disponivel</span>

      <input placeholder="nome" class="input input-bordered" name="name" />
      <input placeholder="email" class="input input-bordered" name="email" />

      <button class="btn disabled:loading" disabled={loading}>enviar</button>
    </form>
  );
}

export default Notify;
