import { useId } from "$store/sdk/useId.ts";
import { useSignal } from "@preact/signals";
import { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";

interface Props {
  onClose?: () => void;
  open?: boolean;
  class?: string;
  style?: string;
  children?: ComponentChildren;
  loading?: "eager" | "lazy";
  hasBackgroundTransparent?: boolean;
}

function Modal(props: Props) {
  const {
    children,
    open,
    onClose,
    loading = "lazy",
    hasBackgroundTransparent = false,
  } = props;
  const lazy = useSignal(loading === "lazy" && !open);
  const id = useId();

  useEffect(() => {
    const handler = (e: KeyboardEvent) =>
      (e.key === "Escape" || e.keyCode === 27) && open && onClose?.();

    addEventListener("keydown", handler);

    return () => {
      removeEventListener("keydown", handler);
    };
  }, [open]);

  useEffect(() => {
    lazy.value = false;
  }, []);

  return (
    <>
      <input
        id={id}
        checked={open}
        type="checkbox"
        aria-label="toggle modal"
        class="modal-toggle"
        onChange={(e) => e.currentTarget.checked === false && onClose?.()}
      />
      <div class={`modal ${hasBackgroundTransparent && "!bg-transparent"}`}>
        {!lazy.value && children}
        <label class="modal-backdrop" for={id}>Close</label>
      </div>
    </>
  );
}

export default Modal;
